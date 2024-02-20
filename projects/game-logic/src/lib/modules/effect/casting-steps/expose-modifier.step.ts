import { IModifierDeclaration } from "../../../cross-cutting/modifier/modifier.interface";
import { JsonPathResolver } from "../../../extensions/json-path";
import { Effect } from "../effect";
import { IExposeModifierCastingStep } from "./casting-step.interface";
import { CastingStepType } from "../effect.constants";
import { CastingStep } from "./casting-step";

export class ExposeModifierCastingStep extends CastingStep implements IExposeModifierCastingStep {
  public id: string;
  public stepType = CastingStepType.ExposeModifier as const;
  public dataType: string;

  public delegateId: string;
  public payload?: unknown;
  public order?: number;
  public exposer: unknown;

  constructor(
    data: IExposeModifierCastingStep,
  ) { 
    super();
  }

  public createModifier(rootEffect: Effect): { modifier: IModifierDeclaration<unknown>; exposer: any; } {
    const modifier = JsonPathResolver.resolve<ExposeModifierCastingStep>(this, rootEffect);
    return { modifier: modifier, exposer: modifier.exposer }
  }
}