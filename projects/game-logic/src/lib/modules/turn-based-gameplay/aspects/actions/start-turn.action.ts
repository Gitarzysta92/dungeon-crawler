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

  public async process(payload: IFinishTurnActionPayload): Promise<void> {
    await this._eventService.process(new StartTurnEvent(payload.gameplay.currentPlayer));
  }
  
}
