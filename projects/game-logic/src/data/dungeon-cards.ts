import { IBasicStats } from "../lib/features/actors/actor"
import { ActorType } from "../lib/features/actors/actor.constants"
import { IBoardSelector } from "../lib/features/board/board.interface"
import { IDungeonCard } from "../lib/features/dungeon/dungeon-deck"
import { EffectType } from "../lib/features/effects/effects.constants"
import { IModifyPosition, IModifyStats, ISpawnActor } from "../lib/features/effects/effects.interface"
import { IDisposable, InteractionType } from "../lib/game/interactions.interface"

export const emptyCard: IDungeonCard<never> = {
  id: "FEA3D848-6D9C-4E7D-A285-D8B41989CE4C",
  name: 'noop',
  effects: []
}

export const increaseEnemyAttackPower: IDungeonCard<IModifyStats<IBasicStats> & IBoardSelector & IDisposable> = {
  id: "023E2534-4B47-49E8-8D2E-DDC5E5255912",
  name: 'increaseEnemyAttackPower',
  effects: [
    {
      effectType: EffectType.ModifyStats,
      modiferValue: 2,
      modifierType: "add",
      statName: "attackPower",
      selectorType: "radius",
      selectorTargets: "single",
      selectorOrigin: "hero",
      selectorRange: 3,
      selectorDirection: 0,
      targetType: ActorType.Enemy,
      interactionType: [InteractionType.Disposable],
      utilizationCost: []
    }
  ]
}

export const moveEnemy: IDungeonCard<IModifyPosition & IBoardSelector & IDisposable> = {
  id: "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
  name: 'moveEnemy',
  effects: [
    {
      effectType: EffectType.ModifyPosition,
      preserveRotation: false,
      selectorType: "global",
      selectorTargets: "single",
      targetType: ActorType.Enemy,
      interactionType: [InteractionType.Disposable],
      utilizationCost: []
    }
  ]
}


export const spawnEnemy: IDungeonCard<ISpawnActor & IBoardSelector & IDisposable> = {
  id: "B27818D2-1336-4C36-9068-AC667BD656D5",
  name: 'spawnEnemy',
  effects: [
    {
      effectType: EffectType.SpawnActor,
      enemyId: "",
      selectorType: "global",
      selectorTargets: "single",
      selectorOrigin: "hero",
      targetType: ActorType.Enemy,
      interactionType: [InteractionType.Disposable],
      utilizationCost: []
    }
  ]
}