import { IEntityFactory, IEntity } from "../../base/entity/entity.interface";
import { CastEffectCastingStep } from "./casting-steps/cast-effect.step";
import { ExposeModifierCastingStep } from "./casting-steps/expose-modifier.step";
import { GatheringDataCastingStep } from "./casting-steps/gathering-data.step";
import { MakeActionCastingStep } from "./casting-steps/make-action.step";
import { Effect } from "./effect";
import { IEffectCastingSchema } from "./casting-steps/casting-step.interface";
import { CastingStepType } from "./effect.constants";
import { IEffect } from "./effect.interface";

export class EffectFactory implements IEntityFactory<IEffect>  {

  public get classDefinition() { return Effect };

  constructor() { }
  
  public create(e: IEffect & IEntity): Effect {
    const effect = new Effect(e); 
    this._createSteps(effect.castingSchema);
    return 
  };

  public validate(e: IEntity & Partial<IEffect>): boolean {
    return e.isEffect;
  };

  private _createSteps(schema: IEffectCastingSchema) {
    Object.entries(schema).map(([key, entry]) => {
      if (entry.stepType === CastingStepType.GatheringData) {
        schema[key] = new GatheringDataCastingStep(entry);
      }

      if (entry.stepType === CastingStepType.CastingEffect) {
        schema[key] = new CastEffectCastingStep(entry);
      }

      if (entry.stepType === CastingStepType.ExposeModifier) {
        schema[key] = new ExposeModifierCastingStep(entry);
      }

      if (entry.stepType === CastingStepType.MakeAction) {
        schema[key] = new MakeActionCastingStep(entry);
      }
    });
  }
}