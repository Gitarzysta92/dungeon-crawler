import { CastingStepType } from "../effect.constants";
import { IEffectDefinition } from "../effect.interface";
import { ICastEffectCastingsStep } from "./casting-step.interface";
import { CastingStep } from "./casting-step";
import { Effect } from "../effect";
import { JsonPathResolver } from "../../../extensions/json-path";



export class CastEffectCastingStep extends CastingStep implements ICastEffectCastingsStep {
  public stepType = CastingStepType.CastingEffect as const;
  public repetitions?: number;
  public effectRef: Effect & IEffectDefinition;
  public order?: number;

  constructor(
    data: ICastEffectCastingsStep,
  ) {
    super();
    this.repetitions = data.repetitions as number ?? 1;
    this.effectRef = data.effectRef as Effect & IEffectDefinition;
    this.order = data.order;
  }

  public createEffects(rootEffect: Effect): Effect[] {
    const effects = [];
    for (let i = 0; i < this.repetitions ?? 1; i++) {
      effects.push(JsonPathResolver
        .resolve<Effect>(this.effectRef.clone(), rootEffect))
    }
    return effects;
  }

}