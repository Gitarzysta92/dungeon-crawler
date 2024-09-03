import { MODIFY_STATISTIC_BY_FORMULA_ACTION } from "./aspects/actions/modify-statistic-by-formula.action";
import { MODIFY_STATISTIC_ACTION } from "./aspects/actions/modify-statistic.action";
import { STATISTIC_MODIFIER } from "./aspects/modifiers/statistic-modifier.mixin";

export enum StatisticType {
  Health,
  Defence,
  AttackPower,
  SpellPower,
  Movement,
  MajorAction,
  MinorAction,
  moveAction
}


export {
  STATISTIC_MODIFIER as STATISTIC_MODIFIER_HANDLER_IDENTIFIER,
  MODIFY_STATISTIC_BY_FORMULA_ACTION as MODIFY_STATISTIC_BY_FORMULA_ACTION_IDENTIFIER,
  MODIFY_STATISTIC_ACTION as MODIFY_STATISTIC_ACTION_IDENTIFIER
}


export const STATISTIC_RESOURCE_TYPE = "STATISTIC_RESOURCE_TYPE";
export const IMPROVE_STATISTIC_ACTIVITY = "IMPROVE_STATISTIC_ACTIVITY";