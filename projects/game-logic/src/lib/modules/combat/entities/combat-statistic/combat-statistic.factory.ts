import { IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IStatistic } from "../../../statistics/entities/statistic/statistic.interface";
import { CombatStatisticType } from "../../combat.constants";
import { ICombatStatistic, ICombatStatisticDeclaration } from "./combat-statistic.interface";

export class CombatStatisticFactory implements IMixinFactory<ICombatStatistic> {

  constructor() { }

  public isApplicable(e: ICombatStatistic): boolean {
    return e.isStatistic && 'combatStatisticType' in e;
  };

  public create(e: Constructor<IEntity & IStatistic>): Constructor<ICombatStatistic> {
    class CombatStatistic extends e implements ICombatStatistic {
      public combatStatisticType: CombatStatisticType;

      constructor(d: ICombatStatisticDeclaration) {
        super(d)
        this.combatStatisticType = d.combatStatisticType;
      }

    }
    return CombatStatistic;
  };
}