import { gainRewardsForKillingEnemies } from "../../features/actors/actors";
import { IEnemy } from "../../features/actors/actors.interface";
import { IRewarding } from "../../features/rewards/rewards.interface";
import { AdventureState } from "../../game/adventure-state";
import { DungeonState } from "../../game/dungeon-state";
import { GameLayer } from "../../game/game.constants";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";
import { claimReward } from "../player-activities/claim-reward.directive";

export const autoclaimRewards = (): IDispatcherDirective =>
  async (state: DungeonState | AdventureState, feed: IGameFeed) => {

    if (state.gameLayer === GameLayer.Dungeon) {
      const actors = state.getAllActors<IEnemy & IRewarding>()
      gainRewardsForKillingEnemies(actors, state.rewardsTracker)
    }

    const rewards = state.rewardsTracker.getRewardsToClaim();
    for (let reward of rewards) {
      if (reward.autoclaim) {
        claimReward({ reward })(state, feed);
      }
    }

    return [{
      name: SystemActivityName.AutoclaimRewards,
      payload: null,
    }]
  }