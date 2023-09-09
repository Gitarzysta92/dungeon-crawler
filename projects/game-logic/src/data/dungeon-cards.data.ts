import { IBasicStats } from "../lib/features/actors/actors.interface"
import { IBoardSelector } from "../lib/features/board/board.interface"
import { IDisposable, IReusable } from "../lib/features/interactions/interactions.interface"
import { IDungeonCard } from "../lib/features/dungeon/dungeon-deck.interface"
import { IModifyPosition } from "../lib/features/effects/modify-position.interface"
import { IModifyStats } from "../lib/features/effects/modify-statistics.interface"
import { ISpawnActor } from "../lib/features/effects/spawn-actor.interface"
import { increaseEnemyAttackPower, meleeAttack, moveEnemy, spawnEnemy } from "./skills-and-spells.data"
import { IDealDamageByWeapoon } from "../lib/features/effects/deal-damage.interface"
import { IImmediateEffect } from "../lib/features/effects/effects.interface"

export const emptyCard: IDungeonCard<any> = {
  id: "FEA3D848-6D9C-4E7D-A285-D8B41989CE4C",
  name: 'noop',
  effects: []
}

export const makeAttackCard: IDungeonCard<IDealDamageByWeapoon & IImmediateEffect & IReusable> = {
  id: "575B810F-2BC5-4D60-A2BD-0C2C362A468F",
  name: "makeMeleeAttack",
  effects: [ meleeAttack ]
}


export const increaseEnemyAttackPowerCard: IDungeonCard<IModifyStats<IBasicStats> & IBoardSelector & IDisposable> = {
  id: "023E2534-4B47-49E8-8D2E-DDC5E5255912",
  name: 'increaseEnemyAttackPower',
  effects: [ increaseEnemyAttackPower ]
}

export const moveEnemyCard: IDungeonCard<IModifyPosition & IBoardSelector & IDisposable> = {
  id: "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
  name: 'moveEnemy',
  effects: [ moveEnemy ]
}


export const spawnEnemyCard: IDungeonCard<ISpawnActor & IBoardSelector & IDisposable> = {
  id: "B27818D2-1336-4C36-9068-AC667BD656D5",
  name: 'spawnEnemy',
  effects: [ spawnEnemy ]
}