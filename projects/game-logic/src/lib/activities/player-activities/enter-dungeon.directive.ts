import { dungeonAreaId } from "../../../data/common-identifiers.data";
import { AdventureState } from "../../game/adventure-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const enterDungeon = (payload: { dungeonId: string }): IDispatcherDirective =>
  (state: AdventureState, feed: IGameFeed) => {
    
    const areas = state.adventureMap.getAllAvailableAreasRelatedToArea(state.hero.occupiedAreaId);
    const dungeonArea = areas.find(a => state.dungeons[payload.dungeonId + a.id]);

    if (!dungeonArea) {
      throw new Error('You are not in the dungeon area');
    }

    const dungeon = state.dungeons[payload.dungeonId + dungeonAreaId];
    state.dungeonInstance = { ...dungeon };

    return [{
      name: AdventureActivityName.EnterDungeon,
      payload: payload,
    }]
  }