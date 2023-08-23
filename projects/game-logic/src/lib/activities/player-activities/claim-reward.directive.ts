import { characters } from "../../../data/adventure.data";
import { introduceCharacter } from "../../features/actors/actors";
import { QuestOrigin } from "../../features/quests/quests.constants";
import { RewardType } from "../../features/rewards/rewards.constants";
import { IReward } from "../../features/rewards/rewards.interface";
import { AdventureState } from "../../game/adventure-state";
import { DungeonState } from "../../game/dungeon-state";
import { GameLayer } from "../../game/game.constants";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName, DungeonActivityName } from "../constants/activity-name";

export const claimReward = (payload: { reward: IReward }): IDispatcherDirective =>
  (state: DungeonState | AdventureState, feed: IGameFeed) => {


    if (payload.reward.rewardType === RewardType.Experience) {
      state.hero.gainExperience(payload.reward);
      state.rewardsTracker.claimReward(payload.reward);
    }

    if (payload.reward.rewardType === RewardType.Item) {
      const item = feed.items.find(i => i.id === payload.reward.id);
      if (!item) {
        throw new Error(`Claim reward: Item is not available in the feed`)
      }
      state.heroInventory.addItem(item, payload.reward.amount);
      state.rewardsTracker.claimReward(payload.reward);
    }

    if (payload.reward.rewardType === RewardType.AreaUnlock && state.gameLayer === GameLayer.Adventure) {
      const area = feed.areas.find(a => a.id === payload.reward.id);
      if (!area) {
        throw new Error(`Claim reward: Area is not available in the feed`)
      }
      state.adventureMap.unlockArea(area, feed.areas);
      state.rewardsTracker.claimReward(payload.reward);
    }

    if (payload.reward.rewardType === RewardType.CharacterUnlock && state.gameLayer === GameLayer.Adventure) {
      const character = feed.characters.find(ch => ch.id === payload.reward.id);
      if (!character) {
        throw new Error(`Claim reward: Character is not available in the feed`)
      }
      const quests = feed.quests.filter(q => q.origin === QuestOrigin.Character && q.originId === character.id) || [];
      Object.assign(character, { quests })
      introduceCharacter(state.characters, character);
      state.rewardsTracker.claimReward(payload.reward);
    }

    return [{
      name: state.gameLayer === GameLayer.Adventure ? AdventureActivityName.ClaimReward : DungeonActivityName.ClaimReward,
      payload: null,
    }]
  }