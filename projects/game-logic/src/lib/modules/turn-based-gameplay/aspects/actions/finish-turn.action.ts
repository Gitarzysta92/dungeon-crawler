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

  public async process(payload: IFinishTurnActionPayload): Promise<void> {
    const prevPlayer = payload.gameplay.currentPlayer;
    const i = payload.gameplay.order.indexOf(payload.gameplay.currentPlayerId);
    payload.gameplay.currentPlayerId = payload.gameplay.order[i + 1] ?? payload.gameplay.order[0];

    if (!payload.gameplay.order[i + 1]) {
      payload.gameplay.round += 1 
    }
    payload.gameplay.turn += 1;
    await this._eventService.process(new FinishTurnEvent(prevPlayer));
  }
}
