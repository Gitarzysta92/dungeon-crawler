import { IPlayer } from "../../../../base/player/players.interface";
import { EventBase } from "../../../../cross-cutting/event/event";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { IControllable } from "../../turn-based-gameplay.interface";

export const FINISH_TURN_EVENT = "FINISH_TURN_EVENT";

export interface IStartTurnEventListenerPayload {
  controllable: IControllable;
}

export class FinishTurnEvent extends EventBase {
  public delegateId = FINISH_TURN_EVENT;

  constructor(
    private readonly _player: IPlayer
  ) {
    super();
  }

  public isApplicableTo(d: IEventListenerDeclaration<IStartTurnEventListenerPayload>): boolean {
    return d.delegateId === this.delegateId && d.payload.controllable.groupId === this._player.groupId;
  }
}