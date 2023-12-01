import { RewardType } from "./rewards.constants";

export type IReward = IExperienceReward |
  IAreaUnlockReward |
  ICharacterUnlockReward |
  IItemReward;

export interface IRewarding {
  rewards: IReward[];
}

export interface IRewardBase {
  id: string;
  isUnique: boolean;
  rewardType: RewardType;
  autoclaim: boolean;
}

export interface IExperienceReward extends IRewardBase {
  rewardType: RewardType.Experience;
  experience: number;
}

export interface IAreaUnlockReward extends IRewardBase {
  rewardType: RewardType.AreaUnlock;
  areaId: string;
}

export interface ICharacterUnlockReward extends IRewardBase {
  rewardType: RewardType.CharacterUnlock;
  characterId: string;
}

export interface IItemReward extends IRewardBase {
  rewardType: RewardType.Item;
  itemId: string;
  amount: number;
}

export interface IRewardsTracker {
  rewardsToClaim: IReward[];
  claimedRewards: (IReward & { claimed: boolean })[];
}