import { IBasicStats } from "../lib/features/actors/actors.interface"
import { IBoardSelector } from "../lib/features/board/board.interface"
import { IDungeonCard } from "../lib/features/dungeon/dungeon-deck.interface"
import { IModifyPosition } from "../lib/features/effects/modify-position/modify-position.interface"
import { IModifyStats } from "../lib/features/effects/modify-statistics/modify-statistics.interface"
import { ISpawnActor } from "../lib/features/effects/spawn-actor/spawn-actor.interface"
import { increaseEnemyAttackPower, moveEnemy, spawnEnemy, enemyAttack, noopEffect } from "./skills-and-spells.data"
import { IDealDamage } from "../lib/features/effects/deal-damage/deal-damage.interface"
import { IImmediateEffect } from "../lib/features/effects/effects.interface"

export const emptyCard: IDungeonCard<any> = {
  id: "FEA3D848-6D9C-4E7D-A285-D8B41989CE4C",
  name: 'noop',
  effect: noopEffect
}

export const makeAttackCard: IDungeonCard<IDealDamage & IImmediateEffect> = {
  id: "575B810F-2BC5-4D60-A2BD-0C2C362A468F",
  name: "makeMeleeAttack",
  effect: enemyAttack
}


export const increaseEnemyAttackPowerCard: IDungeonCard<IModifyStats<IBasicStats> & IBoardSelector> = {
  id: "023E2534-4B47-49E8-8D2E-DDC5E5255912",
  name: 'increaseEnemyAttackPower',
  effect: increaseEnemyAttackPower
}

export const moveEnemyCard: IDungeonCard<IModifyPosition & IBoardSelector> = {
  id: "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
  name: 'moveEnemy',
  effect: moveEnemy
}


export const spawnEnemyCard: IDungeonCard<ISpawnActor & IBoardSelector> = {
  id: "B27818D2-1336-4C36-9068-AC667BD656D5",
  name: 'spawnEnemy',
  effect: spawnEnemy
}