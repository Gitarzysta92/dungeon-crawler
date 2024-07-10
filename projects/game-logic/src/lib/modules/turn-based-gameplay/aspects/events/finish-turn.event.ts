import { IPlayer } from "../../../../base/player/players.interface";
import { EventBase } from "../../../../cross-cutting/event/event";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { Guid } from "../../../../infrastructure/extensions/types";

export const FINISH_TURN_EVENT = "FINISH_TURN_EVENT";

export interface IStartTurnEventListenerPayload {
  playerId: Guid;
}

export class FinishTurnEvent extends EventBase {
  public delegateId = FINISH_TURN_EVENT;

  constructor(
    private readonly _player: IPlayer
  ) {
    super();
  }

  public isApplicableTo(d: IEventListenerDeclaration<IStartTurnEventListenerPayload>): boolean {
    if (!d) {
      console.warn("Provided listener is undefined")
      return false;
    }
    return d.delegateId === this.delegateId && d.payload.playerId === this._player.id;
  }
}