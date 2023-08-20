import { DungeonState } from "../../game/dungeon-state";
import { IBoardObject } from "../board/board.interface";
import { IActor } from "./actors.interface";

export function removeActorsWithZeroHealth(state: DungeonState): void { 
  for (let actor of state.getAllActors<IActor & IBoardObject>()) {
    if ('health' in actor && actor.health === 0) {
      state.board.unassignObject(actor);
    }
  }
}