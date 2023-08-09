import { IDungeonInstance } from "../../features/dungeon/dungeon.interface";
import { AdventureState } from "../../game/adventure-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const enterDungeon = (payload: { dungeon: IDungeonInstance }): IDispatcherDirective =>
  (state: AdventureState, feed: IGameFeed) => {
    
    if (state.adventureMap.occupiedAreaId !== payload.dungeon.associatedAreaId) {
      throw new Error('You are not in the dungeon area');
    }

    return [{
      name: AdventureActivityName.EnterDungeon,
      payload: payload,
    }]
  }