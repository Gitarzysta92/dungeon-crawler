import { IDungeonInstance } from "../../features/dungeon/dungeon.interface";
import { AdventureState } from "../../game/adventure-state";
import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const exitDungeon = (payload: { dungeon: DungeonState }): IDispatcherDirective =>
  (state: AdventureState, feed: IGameFeed) => {
    
    const summary = state.dungeonLog.createSummary(payload.dungeon);
    state.dungeonLog.add(summary);

    return [{
      name: AdventureActivityName.ExitDungeon,
      payload: payload,
    }]
  }