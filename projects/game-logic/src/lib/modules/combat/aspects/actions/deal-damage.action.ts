import { Value } from "../../../../base/value/value";
import { IActionHandler, IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { DealDamageEvent } from "../../../statistics/aspects/events/deal-damage.event";
import { IStatisticBearer } from "../../mixins/combat-contender/damage-dealer.interface";
import { DEAL_DAMAGE_MODIFIER } from "../modifiers/deal-damage.modifier";

export interface IDamageDealer { }
export interface IDamageReciver {}

export const DEAL_DAMAGE_ACTION = "DEAL_DAMAGE_ACTION";

export interface IDealDamageActionDeclaration {
  dealer: ResolvableReference<IDamageDealer>;
  receiver: ResolvableReference<IDamageReciver>;
  value: ResolvableReference<number>;
  damageType: ResolvableReference<number>;
}


export interface IDealDamageActionPayload {
  dealer: IDamageDealer
  receiver: IDamageReciver;
  damageType: number,
  value: number;
}

export interface IDealDamageActionResult {
  dealer: IStatisticBearer
  receiver: IStatisticBearer;
  damageType: number,
  value: number;
}

export class DealDamageActionHandler implements IActionHandler<IDealDamageActionPayload, IDealDamageActionResult> {
  public delegateId = DEAL_DAMAGE_ACTION;
  public modifierType = DEAL_DAMAGE_MODIFIER

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

    // if (!('health' in payload.receiver.statistic)) {
    //   throw new Error("Provided reciver does not have health statistic")
    // }

    // const reciverDefenceModifiers = payload.receiver.getModifiers(payload.receiver.statistic.defence);
    // const reciverHealthModifiers = payload.receiver.getModifiers(payload.receiver.statistic.health);
    // const actionModifiers = payload.dealer.getModifiers(this);
    // const damageModifiers = payload.dealer.getModifiers(this);

    




    // let value = new Value(payload.value, payload.damageType, payload.dealer);

    // if ('defence' in payload.receiver.statistic) {
    //   this._eventService.emit(new DealDamageEvent(
    //     payload.dealer,
    //     payload.receiver,
    //     payload.receiver.statistic.defence,
    //     payload.damageType,
    //     payload.receiver.statistic.defence.takeDamage(value)
    //   ))
    // }

    // this._eventService.emit(new DealDamageEvent(
    //   payload.dealer,
    //   payload.receiver,
    //   payload.receiver.statistic.health,
    //   payload.damageType,
    //   payload.receiver.statistic.health.takeDamage(value)
    // ))

    return {} as any;
  }
}