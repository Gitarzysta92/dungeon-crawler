export enum HeroRewardType {
  AreaUnlock,
  CharacterUnlock,
  LevelUp,
  Item,
}

export interface HeroReward {
  rewardType: HeroRewardType;
  explicit: boolean;
}
