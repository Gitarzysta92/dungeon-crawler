import { IBasicStats } from "../lib/features/actors/actors.interface"
import { ActorType } from "../lib/features/actors/actors.constants"
import { IBoardSelector } from "../lib/features/board/board.interface"
import { EffectName, EffectLifeTime } from "../lib/features/effects/effects.constants"
import { IModifyPosition, IModifyStats, ISpawnActor } from "../lib/features/effects/effects.interface"
import { IDisposable, InteractionType } from "../lib/features/interactions/interactions.interface"
import { IDungeonCard } from "../lib/features/dungeon/dungeon-deck.interface"

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
      id: "D6C907BF-D1C2-4440-8401-4CA71DABD952",
      effectLifeTime: EffectLifeTime.Immediate,
      effectName: EffectName.ModifyStats,
      modiferValue: 2,
      modifierType: "add",
      statName: "attackPower",
      selectorType: "radius",
      selectorRange: 3,
      selectorDirection: 0,
      targetingActors: [ActorType.Enemy],
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
      id: "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
      effectLifeTime: EffectLifeTime.Immediate,
      effectName: EffectName.ModifyPosition,
      preserveRotation: false,
      selectorType: "global",
      targetingActors: [ActorType.Enemy],
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
      id: "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
      effectLifeTime: EffectLifeTime.Immediate,
      effectName: EffectName.SpawnActor,
      enemyId: "",
      selectorType: "global",
      targetingActors: [ActorType.Board],
      interactionType: [InteractionType.Disposable],
      utilizationCost: []
    }
  ]
}