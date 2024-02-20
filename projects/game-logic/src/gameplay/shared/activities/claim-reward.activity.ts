import { IReward } from "../../../../../framework/modules/reward/rewards.interface";
import { AdventureGameplay } from "../../adventure/adventure-gameplay";
import { DungeonGameplay } from "../../dungeon/state/dungeon-gameplay";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { AdventureActivityName, DungeonActivityName } from "./activity.constants";

export const claimReward = (payload: {
  reward: IReward
}): IDispatcherDirective =>
  async (state: DungeonGameplay | AdventureGameplay, feed: IGameFeed) => {

    state.rewardsService.


    return [{
      name: state.gameLayer === GameLayer.Adventure ? AdventureActivityName.ClaimReward : DungeonActivityName.ClaimReward,
      payload: null,
    }]
  }