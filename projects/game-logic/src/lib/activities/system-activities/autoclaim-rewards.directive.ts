import { gainRewardsForKillingEnemies } from "../../features/actors/actors";
import { ICreature } from "../../features/actors/actors.interface";
import { IRewarding } from "../../features/rewards/rewards.interface";
import { AdventureGlobalState } from "../../gameplay/adventure/adventure-state";
import { DungeonGameplayState } from "../../gameplay/dungeon/dungeon-global-state";
import { GameLayer } from "../../states/game.constants";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";
import { claimReward } from "../player-activities/claim-reward.directive";

export const autoclaimRewards = (): IDispatcherDirective =>
  async (state: DungeonGameplayState | AdventureGlobalState, feed: IGameFeed) => {

    if (state.gameLayer === GameLayer.Dungeon) {
      const actors = state.getAllActors<ICreature & IRewarding>()
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