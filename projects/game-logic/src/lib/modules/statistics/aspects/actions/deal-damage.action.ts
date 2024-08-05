import { IActionHandler, IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IStatisticBearer } from "../../entities/bearer/statistic-bearer.interface";
import { DealDamageEvent } from "../events/deal-damage.event";

export const DEAL_DAMAGE_ACTION = "DEAL_DAMAGE_ACTION";

export interface IDealDamageActionDeclaration {
  dealer: ResolvableReference<IStatisticBearer>;
  receiver: ResolvableReference<IStatisticBearer>;
  value: ResolvableReference<number>;
  operator: 'add' | 'substract';
}


export interface IDealDamageActionPayload {
  dealer: IStatisticBearer
  receiver: IStatisticBearer;
  damageType: "",
  value: number;
}

export interface IDealDamageActionResult {
  dealer: IStatisticBearer
  receiver: IStatisticBearer;
  damageType: "",
  value: number;
}

export class ModifyStatisticActionHandler implements IActionHandler<IDealDamageActionPayload, IDealDamageActionResult> {
  public delegateId = DEAL_DAMAGE_ACTION;

  constructor(
    private readonly _eventService: EventService
  ) {}

  public isApplicableTo(d: IActionDeclaration<IDealDamageActionPayload>): boolean {
    return d.delegateId === this.delegateId;
  }

  public process(payload: IDealDamageActionPayload): IDealDamageActionResult {
    if (!payload.dealer) {
      throw new Error("Damage dealer not provided")
    }

    if (!payload.receiver) {
      throw new Error("Damage receiver not provided")
    }

    if (payload.value === undefined) {
      throw new Error("Damage value not provided")
    }

    if (!('health' in payload.receiver.statistic)) {
      throw new Error("Provided reciver does not have health statistic")
    }

    let value = payload.value;
  
    if ('defence' in payload.receiver.statistic) {
      value = payload.receiver.statistic.defence.subtract(payload.value);
      this._eventService.emit(new DealDamageEvent(
        payload.dealer,
        payload.receiver,
        payload.receiver.statistic.defence,
        payload.damageType,
        value - payload.value,
      ))
    }

    payload.receiver.statistic.health.subtract(value);
    this._eventService.emit(new DealDamageEvent(
      payload.dealer,
      payload.receiver,
      payload.receiver.statistic.health,
      payload.damageType,
      value - payload.value,
    ))

    return payload;
  }
}