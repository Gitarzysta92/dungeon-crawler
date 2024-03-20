import { ActorType } from "../../../../../framework/modules/actor/actor.constants";
import { IDungeonExit } from "../../../../../framework/modules/actor/actor.interface";
import { DungeonGameplay } from "../../state/dungeon/dungeon-gameplay";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { AdventureActivityName } from "../activity.constants";

export const leaveDungeon = (payload?: { exit: IDungeonExit }): IDispatcherDirective =>
  async (state: DungeonGameplay, feed: IGameFeed) => {
    
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