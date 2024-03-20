import { CastingStepType } from "../entities/effect.constants";
import { IEffect, IEffectDeclaration } from "../entities/effect.interface";
import { ICastEffectCastingsStep } from "./casting-step.interface";
import { CastingStep } from "./casting-step";
import { JsonPathResolver } from "../../../extensions/json-path";



export class CastEffectCastingStep extends CastingStep implements ICastEffectCastingsStep {
  public stepType = CastingStepType.CastingEffect as const;
  public repetitions?: number;
  public effectRef: IEffect & IEffectDeclaration;
  public order?: number;

  constructor(
    data: ICastEffectCastingsStep,
  ) {
    super();
    this.repetitions = data.repetitions as number ?? 1;
    this.effectRef = data.effectRef as IEffect & IEffectDeclaration;
    this.order = data.order;
  }

  public createEffects(rootEffect: IEffect): IEffect[] {
    const effects = [];
    for (let i = 0; i < this.repetitions ?? 1; i++) {
      effects.push(JsonPathResolver
        .resolve<IEffect>(this.effectRef.clone(), rootEffect))
    }
    return effects;
  }

}