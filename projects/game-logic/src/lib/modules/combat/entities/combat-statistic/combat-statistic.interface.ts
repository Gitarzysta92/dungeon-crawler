import { IStatistic, IStatisticDeclaration } from "../../../statistics/entities/statistic/statistic.interface";
import { CombatStatisticType } from "../../combat.constants";

export interface ICombatStatistic extends IStatistic {
  readonly value: number;
  baseValue: number;
  isStatistic: true;
  combatStatisticType: CombatStatisticType;
}


export interface ICombatStatisticDeclaration extends IStatisticDeclaration {
  baseValue: number;
  isStatistic: true;
  combatStatisticType: CombatStatisticType;
}
