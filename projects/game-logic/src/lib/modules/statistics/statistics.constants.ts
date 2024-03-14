import { MODIFY_STATISTIC_BY_FORMULA_ACTION } from "./aspects/actions/modify-statistic-by-formula.action";
import { MODIFY_STATISTIC_ACTION } from "./aspects/actions/modify-statistic.action";
import { STATISTIC_MODIFIER } from "./aspects/modifiers/statistic.modifier";

export enum StatisticType {
  Static,
  Dynamic
}


export {
  STATISTIC_MODIFIER as STATISTIC_MODIFIER_HANDLER_IDENTIFIER,
  MODIFY_STATISTIC_BY_FORMULA_ACTION as MODIFY_STATISTIC_BY_FORMULA_ACTION_IDENTIFIER,
  MODIFY_STATISTIC_ACTION as MODIFY_STATISTIC_ACTION_IDENTIFIER
}