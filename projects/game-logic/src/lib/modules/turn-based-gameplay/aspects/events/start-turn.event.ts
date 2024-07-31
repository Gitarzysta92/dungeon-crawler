import { IPlayer } from "../../../../base/player/players.interface";
import { EventBase } from "../../../../cross-cutting/event/event";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { ITurnGameplayPlayer } from "../../mixins/turn-based-player/turn-based-player.interface";

export const START_TURN_EVENT = "START_TURN_EVENT";

export interface IStartTurnEventListenerPayload {
  playerId: Guid;
}

export class StartTurnEvent extends EventBase {
  public delegateId = START_TURN_EVENT;

  constructor(
    public  readonly player: ITurnGameplayPlayer
  ) {
    super();
  }

  public isApplicableTo(d: IEventListenerDeclaration<IStartTurnEventListenerPayload>): boolean {
    if (!d) {
      console.warn("Provided listener is undefined")
      return false;
    }
    return d.delegateId === this.delegateId && d.payload.playerId === this.player.id;
  }
}