import { IEffect, IEffectCaster } from "./effect.interface";
import { IEffectCastingSchema } from "./casting-steps/casting-step.interface";
import { EffectCastTime, EffectLifetime } from "./effect.constants";
import { ITriggerDefinition } from "../../cross-cutting/trigger/trigger.interface";
import { IClonable } from "../../extensions/interfaces";
import { JsonPathResolver } from "../../extensions/json-path";
import { IGatherableContext, IGatherableData, IGatheredData, IGatheringRequestor } from "../../cross-cutting/gatherer/data-gatherer.interface";
import { GatheringDataCastingStep } from "./casting-steps/gathering-data.step";
import { CastEffectCastingStep } from "./casting-steps/cast-effect.step";
import { ExposeModifierCastingStep } from "./casting-steps/expose-modifier.step";
import { MakeActionCastingStep } from "./casting-steps/make-action.step";
import { CastingStep } from "./casting-steps/casting-step";


export class Effect implements IEffect, IClonable, IGatheringRequestor {
  public isEffect = true as const;
  public castTimestamp: number;
  public castTime: EffectCastTime;
  public lifetime: EffectLifetime;
  public duration?: number;
  public triggers?: ITriggerDefinition[];
  public castingSchema: IEffectCastingSchema;
  public caster: IEffectCaster;
  public castTriggers?: ITriggerDefinition[];

  public castingSteps: CastingStep[] = [];
  public gatheringSteps: GatheringDataCastingStep[] = [];

  constructor(
    data: IEffect
  ) { 
    this.castTime = data.castTime;
    this.lifetime = data.lifetime;
    if (data.lifetime === EffectLifetime.Lasting) {
      this.duration = data.duration;
    }
  }

  public resolve(): Array<CastEffectCastingStep | MakeActionCastingStep | ExposeModifierCastingStep> {
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
    return this.gatheringSteps.every(s => s.isPartiallyComplemented());
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