import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IStatistic } from "../../../statistics/entities/statistic/statistic.interface";
import { ICombatStatistic } from "../combat-statistic/combat-statistic.interface";

export interface IDamageReciver extends IDamageReciverDeclaration, IEntityDeclaration {
  getDefence(): IStatistic;
  hasHealth(): boolean;
  getHealth(): IStatistic;
  hasDefence(): boolean;
  takeDamage(damage: number, damageType: any): { affectedStatistics: ICombatStatistic[], damage: number, damageType: any }
}


export interface IDamageReciverDeclaration {
  isDamageReciver: true;
}

