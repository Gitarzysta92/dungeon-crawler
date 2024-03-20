import { JsonPathResolver } from "../../../extensions/json-path";
import { IMakeActionCastingStep } from "./casting-step.interface";
import { CastingStepType } from "../entities/effect.constants";
import { CastingStep } from "./casting-step";
import { IActionDeclaration } from "../../../cross-cutting/action/action.interface";
import { IEffect } from "../entities/effect.interface";

export class MakeActionCastingStep extends CastingStep implements IMakeActionCastingStep {
  public stepType = CastingStepType.MakeAction as const;
  public delegateId: string;
  public payload?: unknown;
  public order?: number;

  constructor(
    data: IMakeActionCastingStep,
  ) { 
    super();
    this.delegateId = data.delegateId;
    this.payload = data.payload;
    this.order = data.order;
  }

  public createAction(rootEffect: IEffect): IActionDeclaration<unknown> {
    return JsonPathResolver.resolve<IActionDeclaration<unknown>>(this, rootEffect);
  }
}