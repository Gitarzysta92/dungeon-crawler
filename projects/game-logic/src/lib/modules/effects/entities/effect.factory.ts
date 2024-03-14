import { IEntityFactory, IEntity } from "../../../base/entity/entity.interface";
import { CastEffectCastingStep } from "../casting-steps/cast-effect.step";
import { GatheringDataCastingStep } from "../casting-steps/gathering-data.step";
import { MakeActionCastingStep } from "../casting-steps/make-action.step";
import { IEffectCastingSchema } from "../casting-steps/casting-step.interface";
import { CastingStepType, EffectCastTime, EffectLifetime } from "./effect.constants";
import { IEffect, IEffectCaster } from "./effect.interface";
import { Entity } from "../../../base/entity/entity";
import { IEvent } from "../../../cross-cutting/event/event.interface";
import { IGatheringRequestor, IGatherableContext, IGatheredData } from "../../../cross-cutting/gatherer/data-gatherer.interface";
import { IClonable } from "../../../extensions/interfaces";
import { JsonPathResolver } from "../../../extensions/json-path";
import { CastingStep } from "../casting-steps/casting-step";
import { Constructor } from "../../../extensions/types";

export class EffectFactory implements IEntityFactory<IEffect>  {

  constructor() { }

  public validate(e: IEntity & Partial<IEffect>): boolean {
    return e.isEffect;
  };
  
  public create(e: typeof Entity): Constructor<IEffect> {
    return class Effect extends e implements IEffect, IClonable, IGatheringRequestor {
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

      protected onInitialize(): void {
        Object.entries(this.castingSchema).map(([key, entry]) => {
          if (entry.stepType === CastingStepType.GatheringData) {
            this.castingSchema[key] = new GatheringDataCastingStep(entry);
          }
    
          if (entry.stepType === CastingStepType.CastingEffect) {
            this.castingSchema[key] = new CastEffectCastingStep(entry);
          }
    
          if (entry.stepType === CastingStepType.MakeAction) {
            this.castingSchema[key] = new MakeActionCastingStep(entry);
          }
        });
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
    
    
      public initializeCastingProcess(caster: IEffectCaster): void {
        this.caster = caster;
        const steps = Object.values(this._initializeSteps(this.castingSchema));
        const independentSteps = steps.filter(cs => cs.isIndependent());
        const coupledFirstSteps = steps.filter(cs => !cs.isIndependent() && cs.isFirstStep());
    
        this.castingSteps = [...independentSteps, ...coupledFirstSteps].sort(s => s.order);
        this.gatheringSteps = this.castingSteps.filter(s => s instanceof GatheringDataCastingStep) as GatheringDataCastingStep[]
      }
    
      private _initializeSteps(
        schema: IEffectCastingSchema
      ): { [key: string]: CastingStep } & IEffectCastingSchema {
    
        const resolvedSchema = JsonPathResolver
          .resolve<{ [key: string]: CastingStep } & IEffectCastingSchema>(schema, this);
    
        Object.values(resolvedSchema).forEach((s, i, a) => {
          if (a[i + 1].predecessorRef === s) {
            s.successorRef = a[i + 1];
          }
        });
    
        return resolvedSchema;
      }
    
      public clone(): this {
        return this;
      }
    
    }
  };

}