import { Dungeon } from "../../../../../framework/base/playstyle/turn-based/turn-based-gameplay.service";
import { AdventureGameplay } from "../../../adventure/adventure-gameplay";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { AdventureActivityName } from "../activity.constants";

export const enterDungeon = (payload: { dungeonId: string }): IDispatcherDirective =>
  async (state: AdventureGameplay, feed: IGameFeed) => {
    
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