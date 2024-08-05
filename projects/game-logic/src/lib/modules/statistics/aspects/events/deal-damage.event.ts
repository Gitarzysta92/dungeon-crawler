import { EventBase } from "../../../../cross-cutting/event/event";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { IStatisticBearer } from "../../entities/bearer/statistic-bearer.interface";
import { IStatistic } from "../../entities/statistic/statistic.interface";

export const DEAL_DAMAGE_EVENT = "DEAL_DAMAGE_EVENT";

export class DealDamageEvent extends EventBase {
  public delegateId = DEAL_DAMAGE_EVENT;

  constructor(
    public readonly dealer: IStatisticBearer,
    public readonly receiver: IStatisticBearer,
    public readonly statistic: IStatistic,
    public readonly damageType: string,
    public readonly value: number
  ) {
    super();
  }

  public isApplicableTo(d: IEventListenerDeclaration<unknown>): boolean {
    return false;
  }

}