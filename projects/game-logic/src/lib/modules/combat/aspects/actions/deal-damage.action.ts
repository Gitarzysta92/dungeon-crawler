import { IActionHandler, IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { IModifierExposer } from "../../../../cross-cutting/modifier/modifier.interface";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { DealDamageEvent } from "../events/deal-damage.event";
import { IStatisticBearer } from "../../../statistics/entities/bearer/statistic-bearer.interface";
import { IDamageReciver } from "../../entities/damage-reciver/damage-reciver.interface";
import { DEAL_DAMAGE_MODIFIER } from "../modifiers/deal-damage.modifier";
import { IDamageDealer } from "../../entities/damage-dealer/damage-dealer.interface";


export const DEAL_DAMAGE_ACTION = "DEAL_DAMAGE_ACTION";

export interface IDealDamageActionDeclaration {
  dealer: ResolvableReference<IDamageDealer & IStatisticBearer & IModifierExposer>;
  receiver: ResolvableReference<IDamageReciver & IStatisticBearer & IModifierExposer>;
  damage: ResolvableReference<number>;
  damageType: number;
}


export interface IDealDamageActionPayload {
  dealer: IDamageDealer & IStatisticBearer & IModifierExposer
  receiver: IDamageReciver & IStatisticBearer & IModifierExposer;
  damage: number;
  damageType: number;
}

export interface IDealDamageActionResult {
  dealer: IStatisticBearer
  receiver: IStatisticBearer;
  damage: number;
  damageType: number;
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

  public canBeProcessed(payload: IDealDamageActionPayload): boolean {
    try {
      this._validatePayload(payload)
    } catch {
      return false;
    }
    return true;
  }

  public process(payload: IDealDamageActionPayload): IDealDamageActionResult {
  this._validatePayload(payload)

    const damage = payload.dealer.calculateDamage(payload.damage, payload.damageType);
    const result = payload.receiver.takeDamage(damage, payload.damageType);

    this._eventService.emit(new DealDamageEvent(
      payload.dealer,
      payload.receiver,
      result
    ));

    return {} as any;
  }

  private _validatePayload(payload: IDealDamageActionPayload) {
    if (!payload.dealer) {
      throw new Error("Damage dealer not provided")
    }

    if (!payload.receiver) {
      throw new Error("Damage receiver not provided")
    }

    if (payload.damage === undefined) {
      throw new Error("Damage value not provided")
    }

    if (!payload.receiver.isDamageReciver) {
      throw new Error("Provided reciver is not damageReciver")
    }

    if (!payload.dealer.isDamageDealer) {
      throw new Error("Provided dealer is not damageDealer")
    }

    if (!payload.receiver.hasHealth()) {
      throw new Error("Provided reciver does not have health statistic")
    }
  }
}