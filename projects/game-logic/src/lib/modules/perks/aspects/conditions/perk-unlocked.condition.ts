import { IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { IConditionHandler } from "../../../../cross-cutting/condition/condition.interface";
import { ResolvableReference, Guid } from "../../../../extensions/types";
import { IPerkBearer } from "../../entities/perk-bearer/perk-bearer.interface";
import { IPerk } from "../../perk.interface";

export const PERK_UNLOCKED_CONDITION = "PERK_UNLOCKED_CONDITION";

export interface IPerkUnlockedConditionPayload {
  bearer: ResolvableReference<IPerkBearer>;
  perk: IPerk;
  level?: number;
}

export class PerkUnlockedCondition implements IConditionHandler<IPerkUnlockedConditionPayload> {

  public delegateId = PERK_UNLOCKED_CONDITION;

  constructor(
  ) { }

  public isApplicableTo(m: IActionDeclaration<IPerkUnlockedConditionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  process(p: IPerkUnlockedConditionPayload): boolean {
    return (p.bearer as IPerkBearer).hasUnlocked(p.perk, p.level)
  }


}