import { ActorType } from "../../features/actors/actors.constants";
import { IDungeonExit } from "../../features/actors/actors.interface";
import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const exitDungeon = (payload: { exit: IDungeonExit }): IDispatcherDirective =>
  (state: DungeonState, feed: IGameFeed) => {
    
    if (payload.exit.actorType !== ActorType.DungeonExit) {
      throw new Error("Provided actor is not an DungeonExit actor type")
    }

    const exitBoardObject = state.board.getObjectById(payload.exit.id);
    if (!exitBoardObject) {
      throw new Error("Cannot find given board object")
    }
    
    const isAdjenced = state.board.checkIfObjectsAreAdjacent(state.hero, exitBoardObject);
    if (!isAdjenced) {
      throw new Error("Hero and exit object are not adjacent")
    }

    if (payload.exit.applyExitBonus) {
      for (let exitBonus of state.exitBonuses) {
        state.rewardsTracker.registerReward(exitBonus);
      }
    }

    return [{
      name: AdventureActivityName.ExitDungeon,
      payload: payload,
    }]
  }