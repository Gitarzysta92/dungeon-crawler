export const enum AdventureActivityName {
  EditStats,
  BuyItem,
  SellItem,
  UseItem,
  EquipItem,
  UnequipItem,
  StartQuest,
  FinishQuest,
  Travel,
  EnterDungeon,
  ExitDungeon,
  EscapeDungeon,
  ClaimReward,
  PromoteHero,
  MoveInventoryItem,
  TakeItem
}

export const enum DungeonActivityName {
  CastEffect,
  EquipItem,
  StartTurn,
  FinishTurn,
  MakeAttack,
  ClaimReward,
  MakeMove,
  TakeItem,
  MakeActorInteraction
}


export const enum SystemActivityName {
  StartDungeonTurn,
  PlayDungeonCard,
  FinishDungeonTurn,
  MakeDungeonTurn,
  AutoclaimRewards,
  UnlockAreas
}