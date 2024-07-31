import { EventBase } from "../../cross-cutting/event/event";
import { IPlayer } from "../player/players.interface";

export const GAME_FINISHED = "GAME_FINISHED";


export class GameFinishedEvent extends EventBase {
  public delegateId = GAME_FINISHED;

  constructor(
    public readonly player: IPlayer[]
  ) {
    super();
  }

  public isApplicableTo(d: any): boolean {
    return false;
  }
}