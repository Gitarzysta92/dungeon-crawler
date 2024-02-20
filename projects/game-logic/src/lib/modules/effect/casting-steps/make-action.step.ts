import { IDelegateDeclaration } from "../../../base/delegate/delegate.interface";
import { JsonPathResolver } from "../../../extensions/json-path";
import { Effect } from "../effect";
import { IMakeActionCastingStep } from "./casting-step.interface";
import { CastingStepType } from "../effect.constants";
import { CastingStep } from "./casting-step";

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

  public createAction(rootEffect: Effect): IDelegateDeclaration<unknown> {
    return JsonPathResolver.resolve<IDelegateDeclaration<unknown>>(this, rootEffect);
  }
}