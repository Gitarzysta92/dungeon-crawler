import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IStatistic } from "../../../statistics/entities/statistic/statistic.interface";


export interface IDamageDealer extends IDamageDealerDeclaration, IEntityDeclaration {
  calculateDamage(d: number, t: any): number
}


export interface IDamageDealerDeclaration {
  isDamageDealer: true;
}