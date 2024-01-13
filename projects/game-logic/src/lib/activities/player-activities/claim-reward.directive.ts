import { characters } from "../../../data/adventure.data";
import { introduceCharacter } from "../../features/actors/actors";
import { QuestOrigin } from "../../features/quests/quests.constants";
import { RewardType } from "../../features/rewards/rewards.constants";
import { IReward } from "../../features/rewards/rewards.interface";
import { AdventureGlobalState } from "../../gameplay/adventure/adventure-state";
import { DungeonGameplayState } from "../../gameplay/dungeon/dungeon-global-state";
import { GameLayer } from "../../states/game.constants";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName, DungeonActivityName } from "../constants/activity-name";

export const claimReward = (payload: { reward: IReward }): IDispatcherDirective =>
  async (state: DungeonGameplayState | AdventureGlobalState, feed: IGameFeed) => {


    if (payload.reward.rewardType === RewardType.Experience) {
      state.hero.gainExperience(payload.reward.experience);
      state.rewardsTracker.claimReward(payload.reward);
    }

    if (payload.reward.rewardType === RewardType.Item) {
      const item = await feed.getItem(payload.reward.id);
      if (!item) {
        throw new Error(`Claim reward: Item is not available in the feed`)
      }
      state.heroInventory.addItem(item, payload.reward.amount);
      state.rewardsTracker.claimReward(payload.reward);
    }

    if (payload.reward.rewardType === RewardType.AreaUnlock && state.gameLayer === GameLayer.Adventure) {
      const area = await feed.getArea(payload.reward.id);
      if (!area) {
        throw new Error(`Claim reward: Area is not available in the feed`)
      }
      state.adventureMap.unlockArea(area, await feed.getAreas());
      state.rewardsTracker.claimReward(payload.reward);
    }

    if (payload.reward.rewardType === RewardType.CharacterUnlock && state.gameLayer === GameLayer.Adventure) {
      const character = await feed.getCharacter(payload.reward.id);
      if (!character) {
        throw new Error(`Claim reward: Character is not available in the feed`)
      }
      const quests = (await feed.getQuests()).filter(q => q.origin === QuestOrigin.Character && q.originId === character.id) || [];
      Object.assign(character, { quests })
      introduceCharacter(state.characters, character);
      state.rewardsTracker.claimReward(payload.reward);
    }

    return [{
      name: state.gameLayer === GameLayer.Adventure ? AdventureActivityName.ClaimReward : DungeonActivityName.ClaimReward,
      payload: null,
    }]
  }