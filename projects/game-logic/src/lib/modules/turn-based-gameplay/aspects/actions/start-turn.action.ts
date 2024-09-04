import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { TurnBasedGameplay } from "../../turn-based.gameplay";
import { FinishTurnEvent } from "../events/finish-turn.event";
import { StartTurnEvent } from "../events/start-turn.event";

export const START_TURN_ACTION = "START_TURN_ACTION";

export interface IFinishTurnActionPayload  {
  gameplay: TurnBasedGameplay
}

export class StartTurnActionHandler implements IActionHandler<IFinishTurnActionPayload> {

  public delegateId = START_TURN_ACTION;
  
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
    payload.gameplay.currentPlayer.startedTurn = true;
    await this._eventService.process(new StartTurnEvent(payload.gameplay.currentPlayer));
  }

  private _validatePayload(payload: IFinishTurnActionPayload) {
    if (!payload.gameplay) {
      throw new Error("Gameplay not provided")
    }
  }
  
}
