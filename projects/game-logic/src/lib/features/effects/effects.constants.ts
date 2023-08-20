export enum EffectOwner {
  Hero,
  Dungeon
}

export enum EffectName {
  DealDamage,
  DealDamageByWeapon,
  SpawnActor,
  ModifyStats,
  ModifyPosition,
  ModifyDungeonDeck
}

export enum EffectLifeTime {
  Instantaneous,
  Lasting,
}

export enum EffectResolveType {
  Triggered,
  Passive
}

export enum EffectTargetingResolveTime {
  Immediate,
  JustInTime
}

export enum EffectTrigger {
  FinishTurn,
  CastEffect,
}


export enum DamageType {
  Phisical,
  Magical
}