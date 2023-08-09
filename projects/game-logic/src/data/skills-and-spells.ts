import { IAction } from "../lib/features/action/actions.interface";
import { ActorType } from "../lib/features/actors/actor.constants";
import { DeckInteractionType } from "../lib/features/dungeon/dungeon.constants";
import { IPushCardsToDeck, IRevealCardsToDeck } from "../lib/features/dungeon/dungeon.interface";
import { DamageType, EffectType } from "../lib/features/effects/effects.constants";
import { IDealDamage, IDealDamageByWeapoon, IModifyDungeonDeck, IModifyPosition, IModifyStats } from "../lib/features/effects/effects.interface";


export const meleeAttack: IAction & IDealDamageByWeapoon = {
  id: "A3ED3076-47E7-479B-86B4-147E07DA584C",
  name: 'Melee attack',
  targetingActor: [ActorType.Enemy],
  effectType: EffectType.DealDamageByWeapoon,
  boardSelector: {
    selectorType: 'line',
    selectorTargets: 'single',
    selectorOrigin: 'hero',
    selectorRange: 1,
    selectorDirection: 1,
  },
  utilizationCosts: [
    {
      costType: 'majorAction',
      costValue: 1
    }
  ]
}

export const rangedAttack: IAction & IDealDamageByWeapoon = {
  id: "A3ED3076-47E7-479B-86B4-147E07DA584C",
  name: 'Ranged attack',
  targetingActor: [ActorType.Enemy],
  effectType: EffectType.DealDamageByWeapoon,
  boardSelector: {
    selectorType: 'line',
    selectorTargets: 'single',
    selectorOrigin: 'hero',
    selectorRange: 1,
    selectorDirection: 1,
  },
  utilizationCosts: [
    {
      costType: 'majorAction',
      costValue: 1
    }
  ]
}

export const move: IAction & IModifyPosition = {
  id: "A3ED3076-47E7-479B-86B4-147E07DA584C",
  name: 'Ranged attack',
  targetingActor: [ActorType.Enemy],
  effectType: EffectType.ModifyPosition,
  preserveRotation: false,
  boardSelector: {
    selectorType: 'line',
    selectorTargets: 'single',
    selectorOrigin: 'hero',
    selectorRange: 1,
    selectorDirection: 1,
  },
  utilizationCosts: [
    {
      costType: 'majorAction',
      costValue: 1
    }
  ]
}

export const stealth: IAction & IModifyDungeonDeck<IPushCardsToDeck> = {
  id: "A3ED3076-47E7-479B-86B4-147E07DA584C",
  name: 'Ranged attack',
  targetingActor: [ActorType.DungeonDeck],
  effectType: EffectType.ModifyDungeonDeck,
  deckInteraction: {
    deckInteractionType: DeckInteractionType.Push,
    cards: []
  },
  boardSelector: {
    selectorType: 'line',
    selectorTargets: 'single',
    selectorOrigin: 'hero',
    selectorRange: 1,
    selectorDirection: 1,
  },
  utilizationCosts: [
    {
      costType: 'majorAction',
      costValue: 1
    }
  ]
}


export const fireball: IAction & IDealDamage = {
  id: "A3ED3076-47E7-479B-86B4-147E07DA584C",
  name: 'Fireball',
  targetingActor: [ActorType.Enemy],
  effectType: EffectType.DealDamage,
  damageValue: 20,
  damageType: DamageType.Magical,
  boardSelector: {
    selectorType: 'line',
    selectorTargets: 'single',
    selectorOrigin: 'hero',
    selectorRange: 3,
    selectorDirection: 1,
  },
  utilizationCosts: [
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

export const teleport: IAction & IModifyPosition = {
  id: "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E",
  name: 'Teleport',
  effectType: EffectType.ModifyPosition,
  targetingActor: [ActorType.Hero],
  preserveRotation: false,
  boardSelector: {
    selectorType: 'line',
    selectorTargets: 'single',
    selectorOrigin: 'hero',
    selectorRange: 3,
    selectorDirection: 1,
  },
  utilizationCosts: [
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

export const healing: IAction & IModifyStats = {
  id: "4A75B866-3878-4D23-954E-9DC4E6663DAE",
  name: 'Healing',
  effectType: EffectType.ModifyStats,
  modiferValue: 20,
  statName: 'health',
  targetingActor: [ActorType.Hero, ActorType.Enemy],
  modifierType: 'add',
  boardSelector: {
    selectorType: 'line',
    selectorTargets: 'single',
    selectorOrigin: 'hero',
    selectorRange: 3,
    selectorDirection: 1,
  },
  utilizationCosts: [
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

export const vision: IAction & IModifyDungeonDeck<IRevealCardsToDeck> = {
  id: "605E23E0-6DB9-4B09-A84B-B4738E5D9E55",
  name: 'Vision',
  targetingActor: [ActorType.DungeonDeck],
  effectType: EffectType.ModifyDungeonDeck,
  deckInteraction: {
    deckInteractionType: DeckInteractionType.Reveal,
    amount: 3
  },
  utilizationCosts: [
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