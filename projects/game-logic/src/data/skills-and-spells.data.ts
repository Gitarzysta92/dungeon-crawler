import { IBasicStats } from "../lib/features/actors/actors.interface";
import { ActorType } from "../lib/features/actors/actors.constants";
import { IBoardSelector } from "../lib/features/board/board.interface";
import { DamageType, EffectName, EffectLifeTime, EffectTargetingResolveTime, EffectResolveType, EffectTrigger } from "../lib/features/effects/effects.constants";
import { IImmediateEffect,  ILastingEffect, IPassiveLastingEffect, ITriggeredLastingEffect } from "../lib/features/effects/effects.interface";
import { IDisposable, InteractionType, IReusable } from "../lib/features/interactions/interactions.interface";
import { IDealDamageByWeapoon, IDealDamage } from "../lib/features/effects/deal-damage.interface";
import { DeckInteractionType } from "../lib/features/effects/dungeon-deck-interaction.constants";
import { IDungeonDeckInteraction, IRevealCardsFromDeck } from "../lib/features/effects/dungeon-deck-interaction.interface";
import { IModifyPosition } from "../lib/features/effects/modify-position.interface";
import { IModifyStats } from "../lib/features/effects/modify-statistics.interface";
import { ISpawnActor } from "../lib/features/effects/spawn-actor.interface";


export const enemyAttack: IDealDamage & IReusable & IImmediateEffect & IBoardSelector = {
  id: "0D4B5B19-CE8C-42EA-B0B8-9197D8C85FC1",
  effectName: EffectName.DealDamage,
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectTargetingSelector: {
    targetingActors: [ActorType.Hero],
    selectorTargets: "single",
  },
  interactionType: [InteractionType.Reusable],
  damageValue: 20,
  damageType: DamageType.Phisical,
  selectorType: 'line',
  selectorRange: 3,
  selectorDirection: 1,
  utilizationCost: []
}



export const basicAttack: IDealDamageByWeapoon & IReusable & IImmediateEffect & IBoardSelector = {
  id: "A3ED3076-47E7-479B-86B4-147E07DA584C",
  interactionType: [InteractionType.Reusable],
  effectName: EffectName.DealDamageByWeapon,
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectTargetingSelector: {
    targetingActors: [ActorType.Enemy],
    selectorTargets: "all",
  },
  utilizationCost: [
    {
      costType: 'majorAction',
      costValue: 1
    }
  ],
  selectorType: 'line',
  selectorRange: 3,
  selectorDirection: 1,
}


export const move: IModifyPosition & IReusable & IImmediateEffect & IBoardSelector = {
  id: "85745620-91E7-4BDB-BE6A-EBE7B207E4DD",
  effectName: EffectName.ModifyPosition,
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectTargetingSelector: {
    targetingActors: [ActorType.Hero],
    selectorTargets: "caster",
  },
  interactionType: [InteractionType.Reusable],
  preserveRotation: false,
  selectorType: 'radius',
  selectorRange: 1,
  selectorDirection: 1,
  utilizationCost: [
    {
      costType: 'moveAction',
      costValue: 1
    }
  ]
}


export const fireball: IDealDamage & IReusable & IImmediateEffect & IBoardSelector = {
  id: "A1F8217E-5C5B-4512-A6CE-6C553AC587F0",
  effectName: EffectName.DealDamage,
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectTargetingSelector: {
    targetingActors: [ActorType.Enemy],
    selectorTargets: "single",
  },
  interactionType: [InteractionType.Reusable],
  damageValue: 20,
  damageType: DamageType.Magical,
  selectorType: 'line',
  selectorRange: 3,
  selectorDirection: 1,
  utilizationCost: [
    {
      costType: 'source',
      costValue: 20
    },
    {
      costType: 'majorAction',
      costValue: 1
    }
  ]
}

export const teleport: IModifyPosition & IReusable & IImmediateEffect & IBoardSelector = {
  id: "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E",
  effectName: EffectName.ModifyPosition,
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectTargetingSelector: {
    targetingActors: [ActorType.Hero],
    selectorTargets: "caster",
  },
  interactionType: [InteractionType.Reusable],
  preserveRotation: false,
  selectorType: 'line',
  selectorRange: 3,
  selectorDirection: 1,
  utilizationCost: [
    {
      costType: 'source',
      costValue: 20
    },
    {
      costType: 'majorAction',
      costValue: 1
    }
  ]
}

export const healing: IModifyStats<IBasicStats> & IReusable & IImmediateEffect & IBoardSelector = {
  id: "4A75B866-3878-4D23-954E-9DC4E6663DAE",
  effectName: EffectName.ModifyStats,
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectTargetingSelector: {
    targetingActors: [ActorType.Hero],
    selectorTargets: "caster",
  },
  interactionType: [InteractionType.Reusable],
  statsModifications: [
    {
      statName: 'health',
      modiferValue: 20,
      modifierType: 'substract',
    }
  ],
  selectorType: 'line',
  selectorRange: 3,
  selectorDirection: 1,
  utilizationCost: [
    {
      costType: 'source',
      costValue: 20
    },
    {
      costType: 'majorAction',
      costValue: 1
    }
  ]
}

export const vision: IDungeonDeckInteraction<IRevealCardsFromDeck> & IReusable & IImmediateEffect = {
  id: "605E23E0-6DB9-4B09-A84B-B4738E5D9E55",
  effectName: EffectName.DungeonDeckInteraction,
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectTargetingSelector: {
    targetingActors: [ActorType.DungeonDeck],
    selectorTargets: "single",
  },
  interactionType: [InteractionType.Reusable],
  deckInteraction: {
    deckInteractionType: DeckInteractionType.RevealCards,
    amountOfCardsToReveal: 3
  },
  utilizationCost: [
    {
      costType: 'source',
      costValue: 20
    },
    {
      costType: 'majorAction',
      costValue: 1
    }
  ] 
}

export const weakness: IModifyStats<IBasicStats> & IReusable & ILastingEffect & IBoardSelector  = {
  id: "7A7B211B-92FB-4417-B1A9-853FB1564F0A",
  effectName: EffectName.ModifyStats,
  effectLifeTime: EffectLifeTime.Lasting,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectTargetingSelector: {
    targetingActors: [ActorType.Enemy],
    selectorTargets: "multiple",
    amountOfTargets: 2
  },
  effectResolveType: EffectResolveType.Passive,
  durationInTurns: 3,
  interactionType: [InteractionType.Reusable],
  selectorType: 'radius',
  selectorRange: 3,
  selectorDirection: 1,
  statsModifications: [
    {
      statName: 'health',
      modiferValue: 20,
      modifierType: 'substract',
    }
  ],
  utilizationCost: [
    {
      costType: 'source',
      costValue: 20
    },
    {
      costType: 'majorAction',
      costValue: 1
    }
  ]
}


export const curse: IModifyStats<IBasicStats> & IReusable & IPassiveLastingEffect & IBoardSelector  = {
  id: "636642BE-EA42-4482-B81C-48D8398D3BC5",
  effectName: EffectName.ModifyStats,
  effectLifeTime: EffectLifeTime.Lasting,
  effectResolveTime: EffectTargetingResolveTime.JustInTime,
  effectTargetingSelector: {
    targetingActors: [ActorType.Enemy],
    selectorTargets: "single"
  },
  effectResolveType: EffectResolveType.Passive,
  durationInTurns: 3,
  interactionType: [InteractionType.Reusable],
  selectorType: 'radius',
  selectorRange: 3,
  selectorDirection: 1,
  statsModifications: [
    {
      statName: 'health',
      modiferValue: 20,
      modifierType: 'substract',
    }
  ],
  utilizationCost: [
    {
      costType: 'source',
      costValue: 20
    },
    {
      costType: 'majorAction',
      costValue: 1
    }
  ]
}


export const meteorShower: IDealDamage & IReusable & ITriggeredLastingEffect & IBoardSelector  = {
  id: "B0D3E90C-E359-43C9-A42F-30D9B37B2E0E",
  effectName: EffectName.DealDamage,
  effectLifeTime: EffectLifeTime.Lasting,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectTargetingSelector: {
    targetingActors: [ActorType.Enemy],
    selectorTargets: "all"
  },
  effectResolveType: EffectResolveType.Triggered,
  effectTriggers: [EffectTrigger.FinishTurn], 
  durationInTurns: 3,
  interactionType: [InteractionType.Reusable],
  damageType: DamageType.Magical,
  damageValue: 10,
  selectorType: 'radius',
  selectorRange: 3,
  selectorDirection: 1,
  utilizationCost: [
    {
      costType: 'source',
      costValue: 20
    },
    {
      costType: 'majorAction',
      costValue: 1
    }
  ]
}


export const increaseEnemyAttackPower: IModifyStats<IBasicStats> & IBoardSelector & IDisposable = {
  id: "D6C907BF-D1C2-4440-8401-4CA71DABD952",
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectName: EffectName.ModifyStats,
  statsModifications: [
    {
      statName: 'attackPower',
      modiferValue: 20,
      modifierType: 'add',
    }
  ],
  effectTargetingSelector: {
    targetingActors: [ActorType.Enemy],
    selectorTargets: "single",
  },
  selectorType: "radius",
  selectorRange: 3,
  selectorDirection: 0,
  interactionType: [InteractionType.Disposable],
  utilizationCost: [],
  requiredPayload: true
}


export const moveEnemy: IModifyPosition & IBoardSelector & IDisposable = {
  id: "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectName: EffectName.ModifyPosition,
  preserveRotation: false,
  selectorType: "global",
  selectorRange: 2,
  effectTargetingSelector: {
    targetingActors: [ActorType.Enemy],
    selectorTargets: "single",
  },
  interactionType: [InteractionType.Disposable],
  utilizationCost: [],
  requiredPayload: true
}

export const spawnEnemy: ISpawnActor & IBoardSelector & IDisposable = {
  id: "3082D56E-224E-47B9-A5FA-E9736C444C20",
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectName: EffectName.SpawnActor,
  enemyId: "",
  selectorType: "global",
  effectTargetingSelector: {
    targetingActors: [ActorType.Enemy],
    selectorTargets: "single",
  },
  interactionType: [InteractionType.Disposable],
  utilizationCost: [],
  requiredPayload: true
}