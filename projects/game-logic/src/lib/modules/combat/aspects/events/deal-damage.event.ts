import { EventBase } from "../../../../cross-cutting/event/event";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { IStatisticBearer } from "../../../statistics/entities/bearer/statistic-bearer.interface";
import { ICombatStatistic } from "../../entities/combat-statistic/combat-statistic.interface";

export const DEAL_DAMAGE_EVENT = "DEAL_DAMAGE_EVENT";

export class DealDamageEvent extends EventBase {
  public delegateId = DEAL_DAMAGE_EVENT;

  constructor(
    public readonly dealer: IStatisticBearer,
    public readonly receiver: IStatisticBearer,
    public readonly value: { affectedStatistics: ICombatStatistic[], damage: number, damageType: any }
  ) {
    super();
  }

  public isApplicableTo(d: IEventListenerDeclaration<unknown>): boolean {
    return false;
  }

}