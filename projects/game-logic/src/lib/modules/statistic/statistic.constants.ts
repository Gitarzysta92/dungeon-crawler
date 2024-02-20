import { MODIFY_STATISTIC_BY_FORMULA_ACTION_IDENTIFIER } from "./aspects/actions/modify-statistic-by-formula.action";
import { MODIFY_STATISTIC_ACTION_IDENTIFIER } from "./aspects/actions/modify-statistic.action";
import { STATISTIC_MODIFIER_HANDLER_IDENTIFIER } from "./aspects/modifiers/statistic.modifier";

export enum StatisticType {
  Static,
  Dynamic
}


export {
  STATISTIC_MODIFIER_HANDLER_IDENTIFIER,
  MODIFY_STATISTIC_BY_FORMULA_ACTION_IDENTIFIER,
  MODIFY_STATISTIC_ACTION_IDENTIFIER
}