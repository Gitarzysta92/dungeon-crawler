import { JsonPathResolver } from "../../infrastructure/extensions/json-path";
import { Constructor } from "../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { ProcedureAggregate } from "./procedure-aggregate";
import { ProcedureStep } from "./procedure-step";
import { ProcedureExecutionPhase } from "./procedure.constants";
import { IProcedure, IProcedureContext, IProcedureDeclaration, IProcedureStep, IProcedureExecutionStatus, IProcedureStepResult } from "./procedure.interface";
import { ProcedureService } from "./procedure.service";


export class ProcedureFactory implements IMixinFactory<IProcedure>  {

  constructor(
    private readonly _procedureService: ProcedureService
  ) {}

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
                executionPhaseType: ProcedureExecutionPhase.Executing,
                executionData: i.value
              }
              if (i.done) {
                stepResult = i.value;
              }
            } while(!i.done)
          } else {
            stepResult = result as IProcedureStepResult;
          }

          // Handle nested procedure
          if (!!currentStep.procedure) {
            for await (let phase of currentStep.procedure.perform(ctx, a => aggregate.aggregate(currentStep, a))) {
              yield this._mapToNestedPhase(phase, currentStep)
            }
          }

          // Establish if procedure should be continued
          nextStep = currentStep.getNextStep(aggregate) ??
            this.orderedStepList.find(s => !s.isResolved(aggregate));

          if (this.orderedStepList.every(s => s.isResolved(aggregate))) {
            stepResult.continueExecution = false
          }
        } while (stepResult.continueExecution);
    
        yield {
          aggregatedData: aggregate.getAggregationState(),
          step: null,
          executionPhaseType: ProcedureExecutionPhase.ExecutionFinished
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
            Object.defineProperty(steps[key].nextStep, 'prevStep', {
              value: step,
              enumerable: false
            })
          }
        }
    
        return steps as { [key: string]: ProcedureStep; };
      }

      private _mapToNestedPhase(phase: IProcedureExecutionStatus, currentStep: IProcedureStep): IProcedureExecutionStatus {
        return {
          step: phase.step,
          aggregatedData: phase.aggregatedData,
          executionPhaseType: phase.executionPhaseType === ProcedureExecutionPhase.ExecutionFinished ?
            ProcedureExecutionPhase.NestedExecutionFinished : phase.executionPhaseType
        }
      }

    }
    return Procedure
  }
}