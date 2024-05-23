
import { IEntityDeclaration, IEntity } from "../../../base/entity/entity.interface";
import { IEvent } from "../../../cross-cutting/event/event.interface";
import { IGatherableContext, IGatheredData, IGatheringRequestor } from "../../../cross-cutting/gatherer/data-gatherer.interface";
import { DataGatheringService } from "../../../cross-cutting/gatherer/data-gathering-service";
import { DataGatheringTask } from "../../../cross-cutting/gatherer/data-gathering-task";
import { JsonPathResolver } from "../../../infrastructure/extensions/json-path";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../infrastructure/mixin/mixin.interface";
import { CastEffectCastingStep } from "../casting-steps/cast-effect.step";
import { CastingStep } from "../casting-steps/casting-step";
import { IEffectCastingSchema } from "../casting-steps/casting-step.interface";
import { GatheringDataCastingStep } from "../casting-steps/gathering-data.step";
import { MakeActionCastingStep } from "../casting-steps/make-action.step";
import { EffectService } from "../effects.service";
import { CastingStepType, EffectCastTime, EffectLifetime } from "./effect.constants";
import { IEffect, IEffectCaster } from "./effect.interface";

export class EffectFactory implements IMixinFactory<IEffect>  {

  constructor(
    private readonly _effectService: EffectService,
    private readonly _dataGatheringService: DataGatheringService,
  ) { }

  public validate(e: IEntityDeclaration & Partial<IEffect>): boolean {
    return e.isEffect;
  };
  
  public create(e: Constructor<IEntity>): Constructor<IEffect> {
    const effectService = this._effectService;
    const dataGatheringService = this._dataGatheringService;
    return class Effect extends e implements IEffect, IGatheringRequestor {
      public isEffect = true as const;
      public castTimestamp: number;
      public castTime: EffectCastTime;
      public lifetime: EffectLifetime;
      public duration?: number;
      public triggers?: IEvent<unknown>[];
      public castingSchema: IEffectCastingSchema;
      public caster: IEffectCaster;
      public castTriggers?: IEvent<unknown>[];
    
      public castingSteps: CastingStep[] = [];
      public gatheringSteps: GatheringDataCastingStep[] = [];
    
      constructor(
        data: IEffect
      ) { 
        super(data);
        this.castTime = data.castTime;
        this.lifetime = data.lifetime;
        if (data.lifetime === EffectLifetime.Lasting) {
          this.duration = data.duration;
        }
      }

      // protected onInitialize(): void {
      //   this._initializeSteps();
      //   super.onInitialize();
      // }

      public initializeCastingProcess(caster: IEffectCaster): DataGatheringTask {
        this.caster = caster;
        const steps = Object.values(this._initializeSteps(this.castingSchema));
        const independentSteps = steps.filter(cs => cs.isIndependent());
        const coupledFirstSteps = steps.filter(cs => !cs.isIndependent() && cs.isFirstStep());
    
        this.castingSteps = [...independentSteps, ...coupledFirstSteps].sort(s => s.order);
        this.gatheringSteps = this.castingSteps.filter(s => s instanceof GatheringDataCastingStep) as GatheringDataCastingStep[];

        return dataGatheringService.createDataGatheringTask(this, caster.gatherers);
      }
    

      public resolve(): Array<CastEffectCastingStep | MakeActionCastingStep> {
        if (!this.isSatisfied() && !this.isPartiallySatisfied()) {
          throw new Error();
        }
    
        return [];
      }
    
    
      public getGatherableData(): IGatherableContext {
        const step = this.gatheringSteps.find(s => !s.isComplemented());
        return {
          data: step.getDataToGather(),
          prev: step.gatheredData,
          context: this
        };
      }
    
    
      public isSatisfied(): boolean {
        return this.gatheringSteps.every(s => s.isComplemented());
      }
    
    
      public isPartiallySatisfied(): boolean {
        return this.gatheringSteps.every(s => s.isPartiallyComplemented() || s.isComplemented());
      }
    
    
      public takeData(step: GatheringDataCastingStep, data: IGatheredData<unknown>): void {
        step.aggregate(data);
      }

          
      public clone(): IEffect & any {
        return this;
      }
    
      private _initializeSteps(
        schema: IEffectCastingSchema
      ): { [key: string]: CastingStep } & IEffectCastingSchema {
        Object.entries(this.castingSchema).map(([key, entry]) => {
          if (entry.stepType === CastingStepType.GatheringData) {
            this.castingSchema[key] = new GatheringDataCastingStep(entry);
          }
    
          if (entry.stepType === CastingStepType.CastingEffect) {
            this.castingSchema[key] = new CastEffectCastingStep(entry as any);
          }
    
          if (entry.stepType === CastingStepType.MakeAction) {
            this.castingSchema[key] = new MakeActionCastingStep(entry) as any;
          }
        });

        const resolvedSchema = JsonPathResolver
          .resolve<{ [key: string]: CastingStep } & IEffectCastingSchema>(schema, this);
    
        Object.values(resolvedSchema).forEach((s, i, a) => {
          if (a[i + 1].predecessorRef === s) {
            s.successorRef = a[i + 1];
          }
        });
    
        return resolvedSchema;
      }

    }
  };

}