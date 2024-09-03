import { JsonPathResolver } from "../../infrastructure/extensions/json-path";
import { Constructor } from "../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { ProcedureAggregate } from "./procedure-aggregate";
import { ProcedureStep } from "./procedure-step";
import { ProcedureExecutionPhase } from "./procedure.constants";
import { IProcedure, IProcedureContext, IProcedureDeclaration, IProcedureStep, IProcedureExecutionStatus, IProcedureStepResult } from "./procedure.interface";
import { ProcedureService } from "./procedure.service";
import { IExecuteProcedureStepDeclaration } from "./step/execute-procedure.interface";


export class ProcedureFactory implements IMixinFactory<IProcedure>  {

  constructor(
    private readonly _procedureService: ProcedureService
  ) { }
  
  public static isProcedure(data: any): boolean {
    return data.isProcedure; 
  }
  
  public static asProcedure<T>(data: T): T & IProcedure {
    if (!this.isProcedure(data)) {
      throw new Error("Provided data is not a Procedure");
    } 
    return data as T & IProcedure;
  }

  public isApplicable(e: IProcedureDeclaration): boolean {
    return e.isProcedure;
  };
  
  public create(e: Constructor<IMixin>): Constructor<IProcedure> { 
    const procedureService = this._procedureService;
    class Procedure extends e implements IProcedure {

      public isProcedure = true as const;
      public procedureSteps: { [key: string]: ProcedureStep; };

      public get numberOfSteps() { return Object.keys(this.procedureSteps).length };
      public get orderedStepList() { return Object.values(this.procedureSteps).sort((p, c) => p.index < c.index ? -1 : 1) };
      public get initialStep() { return this.orderedStepList[0] }
      
      constructor(data: IProcedureDeclaration) {
        super(data);
        this.procedureSteps = this.initializeSteps(data)
      }


      public async *perform(ctx: IProcedureContext, pa?: (a: ProcedureAggregate) => void): AsyncGenerator<IProcedureExecutionStatus> {
        if (!this.initialStep) {
          throw new Error("Initial step not declared");
        }
        const aggregate = new ProcedureAggregate();
        if (pa) {
          pa(aggregate)
        }
        let currentStep: ProcedureStep = null;
        let nextStep: ProcedureStep = this.initialStep;
        let stepResult: IProcedureStepResult = null;

        do {
          currentStep = nextStep;
          nextStep = null;
          yield {
            aggregatedData: aggregate.getAggregationState(),
            step: currentStep,
            executionPhaseType: ProcedureExecutionPhase.BeforeStepExecution
          }

          const allowEarlyResolve = aggregate.isDataEvenlyDistributed(this.orderedStepList);

          // Handle step if it is a generator function
          const result = await currentStep.execute(aggregate, ctx, allowEarlyResolve)
          if ('next' in result) {
            let i
            do {
              i = await result.next();
              yield {
                aggregatedData: aggregate.getAggregationState(),
                step: currentStep,
                executionPhaseType: i.value.executionPhaseType ?? ProcedureExecutionPhase.Executing,
                executionData: i.value
              }
              if (i.done) {
                stepResult = i.value;
              }
            } while(!i.done)
          } else {
            stepResult = result as IProcedureStepResult;
          }

          nextStep = currentStep.getNextStep(aggregate) ?? this.orderedStepList.find(s => !s.isResolved(aggregate));

          // Establish if procedure should be continued
          if (this.orderedStepList.every(s => s.isResolved(aggregate))) {
            stepResult.continueExecution = false
          }
        } while (stepResult.continueExecution);
    
        yield {
          aggregatedData: aggregate.getAggregationState(),
          step: null,
          executionPhaseType: ProcedureExecutionPhase.ExecutionFinished,
          isSuccessful: aggregate.isDataEvenlyDistributed(this.orderedStepList)
        }
      }
    

      public initializeSteps(d: IProcedureDeclaration): { [key: string]: ProcedureStep; } {
        const steps = d.procedureSteps;
        let i = 0;
        for (let key in steps) {
          const step = procedureService.createProcedureStep(steps[key]);
          step.key = key;
          step.index = i++;
          steps[key] = step
        }
    
        for (let key in steps) {
          if (JsonPathResolver.isResolvableReference(steps[key].nextStep)) {
            Object.defineProperty(steps[key], 'nextStep', {
              value: JsonPathResolver.resolveInline(steps[key].nextStep as string, d),
              enumerable: false
            })
          }
          const step = steps[key] as ProcedureStep;
          if (step.nextStep) {
            Object.defineProperty(step.nextStep, 'prevStep', {
              value: step,
              enumerable: false
            })
          }
        }
    
        return steps as { [key: string]: ProcedureStep; };
      }

    }
    return Procedure
  }
}