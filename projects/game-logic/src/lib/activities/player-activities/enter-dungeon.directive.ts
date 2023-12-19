import { Dungeon } from "../../features/dungeon/dungeon.state-handler";
import { AdventureGlobalState } from "../../gameplay/adventure/adventure-state";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const enterDungeon = (payload: { dungeonId: string }): IDispatcherDirective =>
  async (state: AdventureGlobalState, feed: IGameFeed) => {
    
    const dungeonArea = state.adventureMap.getAllAvailableAreasRelatedToArea(state.hero.occupiedAreaId)
      .find(a => state.dungeons[a.id])
    
    if (!dungeonArea) {
      throw new Error('You are not in the dungeon area');
    }

    const dungeonConfiguration = state.dungeons[dungeonArea.id];
    const dungeon = await feed.getDungeon(dungeonConfiguration.dungeonId);
    state.dungeonInstance = new Dungeon(Object.assign(dungeon, dungeonConfiguration));

    return [{
      name: AdventureActivityName.EnterDungeon,
      payload: payload,
    }]
  }