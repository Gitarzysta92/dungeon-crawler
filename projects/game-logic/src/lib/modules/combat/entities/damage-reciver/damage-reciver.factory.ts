import { IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { CombatStatisticType } from "../../combat.constants";
import { IDamageReciver } from "./damage-reciver.interface";
import { ICombatStatistic } from "../combat-statistic/combat-statistic.interface";


export class DamageReciverFactory implements IMixinFactory<IDamageReciver>  {

  constructor() { }

  public static isDamageReciver(e: any): boolean {
    return e.isDamageReciver;
  }
  
  public static asDamageReciver<T>(data: T): T & IDamageReciver {
    if (!this.isDamageReciver(data)) {
      throw new Error("Provided data is not a DamageReciver");
    } 
    return data as T & IDamageReciver
  }

  public isApplicable(e: IDamageReciver): boolean {
    return e.isDamageReciver;
  };


  public create(bc: Constructor<IEntity>): Constructor<IDamageReciver> {
    return class DamageReciver extends bc implements IDamageReciver {


      public isDamageReciver = true as const;
    
      constructor(e: IDamageReciver) {
        super(e);
      }

      public takeDamage(damage: number, damageType: any): { affectedStatistics: ICombatStatistic[], damage: number, damageType: any } {
        const health = this.getEntity<ICombatStatistic>(e => e.isStatistic && e.combatStatisticType === CombatStatisticType.Health);
        if (!health) {
          throw new Error("Cannot take damage. Selected reciver has not health statistic.")
        }

        let rest = 0;
        const affectedStatistics = [];
        const defence = this.getEntity<ICombatStatistic>(e => e.isStatistic && e.combatStatisticType === CombatStatisticType.Defence);
        if (defence) {
          rest = defence.subtract(damage);
          affectedStatistics.push(defence);
        }

        health.subtract(rest);
        return { affectedStatistics, damage, damageType: damageType }
      }

      public getDefence(): ICombatStatistic {
        return this.getEntity<ICombatStatistic>(e => e.isStatistic && e.combatStatisticType === CombatStatisticType.Defence)
      }

      public getHealth(): ICombatStatistic {
        return this.getEntity<ICombatStatistic>(e => e.isStatistic && e.combatStatisticType === CombatStatisticType.Health)
      }

      public hasDefence(): boolean {
        return !!this.getEntity<ICombatStatistic>(e => e.isStatistic && e.combatStatisticType === CombatStatisticType.Defence)
      }

      public hasHealth(): boolean {
        return !!this.getEntity<ICombatStatistic>(s => s.isStatistic && s.combatStatisticType === CombatStatisticType.Health)
      }

    }
  };
}