import { PropertyName } from "../../extensions/types";
import { StatisticType } from "./statistic.constants";

export type IStatistic = {
  id: PropertyName,
  isStatistic: true;
} & (
  {
    type: StatisticType.Static,
    value: number
  } | 
  {
    type: StatisticType.Dynamic,
    baseValue: number;
    value?: number;
    regain: {
      value: number,
      triggeringEvents: unknown[]
    }
  }
)