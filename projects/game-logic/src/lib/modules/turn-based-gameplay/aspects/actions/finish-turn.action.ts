import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { TurnBasedGameplay } from "../../turn-based.gameplay";
import { FinishTurnEvent } from "../events/finish-turn.event";

export const FINISH_TURN_ACTION = "FINISH_TURN_ACTION";

export interface IFinishTurnActionPayload  {
  gameplay: TurnBasedGameplay
}

export class FinishTurnActionHandler implements IActionHandler<IFinishTurnActionPayload> {

  public delegateId = FINISH_TURN_ACTION;
  
  constructor(
    private readonly _eventService: EventService,
  ) {}
  
  public isApplicableTo(m: IActionDeclaration<IFinishTurnActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public canBeProcessed(payload: IFinishTurnActionPayload): boolean {
    try {
      this._validatePayload(payload)
    } catch {
      return false;
    }
    return true;
  }

  public async process(payload: IFinishTurnActionPayload): Promise<void> {
    const prevPlayer = payload.gameplay.currentPlayer;
    prevPlayer.startedTurn = false;
    const i = payload.gameplay.order.indexOf(payload.gameplay.currentPlayerId);
    payload.gameplay.currentPlayerId = payload.gameplay.order[i + 1] ?? payload.gameplay.order[0];

    if (!payload.gameplay.order[i + 1]) {
      payload.gameplay.round += 1 
    }
    payload.gameplay.turn += 1;
    await this._eventService.process(new FinishTurnEvent(prevPlayer));
  }

  private _validatePayload(payload: IFinishTurnActionPayload) {
    if (!payload.gameplay) {
      throw new Error("Gameplay not provided")
    }
  }
}
