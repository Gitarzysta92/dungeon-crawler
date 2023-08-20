import { IHero } from "../../features/actors/hero.interface";
import { IDungeonInstance } from "../../features/dungeon/dungeon.interface";
import { AdventureState } from "../../game/adventure-state";
import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const escapeDungeon = (payload: { dungeon: DungeonState }): IDispatcherDirective =>
  (state: AdventureState, feed: IGameFeed) => {
    
    const summary = state.dungeonLog.createSummary(payload.dungeon);
    calculateEscapePenalty(payload.dungeon, state.hero);
    state.dungeonLog.add(summary);

    return [{
      name: AdventureActivityName.EnterDungeon,
      payload: payload,
    }]
  }



function calculateEscapePenalty(dungeon: IDungeonInstance, hero: IHero): void {

}