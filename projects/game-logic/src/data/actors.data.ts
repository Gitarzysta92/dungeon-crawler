import { IBasicStats, IDungeonExit, IEnemy, IObstacle, ITreasure } from "../lib/features/actors/actors.interface"
import { ActorType, Outlet } from "../lib/features/actors/actors.constants"
import { InteractionType, IReusable } from "../lib/features/interactions/interactions.interface"
import { IAffectable } from "../lib/features/effects/effects.interface"
import { IEffect } from "../lib/features/effects/resolve-effect.interface"
import { IDealDamage } from "../lib/features/effects/deal-damage/deal-damage.interface"
import { IBoardSelector } from "../lib/features/board/board.interface"
import { EffectName, EffectLifeTime, EffectTargetingResolveTime, DamageType } from "../lib/features/effects/effects.constants"
import { dungeonGroupId, ratActorId } from "./common-identifiers.data"

export const ratActor: IEnemy & IBasicStats & IAffectable<IEffect> & IDealDamage & IBoardSelector = {
  id: ratActorId,
  actorType: ActorType.Enemy,
  health: 20,
  defence: 0,
  attackPower: 10,
  spellPower: 0,
  lastingEffects: [],
  healthUpperLimit: 20,
  defenceUpperLimit: 0,
  attackPowerUpperLimit: 10,
  spellPowerUpperLimit: 0,
  outlets: [Outlet.Top],
  effectName: EffectName.DealDamage,
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectTargetingSelector: {
    targetingActors: [ActorType.Hero],
    selectorTargets: "single",
  },
  damageValue: 20,
  damageType: DamageType.Phisical,
  selectorType: 'line',
  selectorRange: 1,
  groupId: dungeonGroupId
}

export const obstacleActor: IObstacle = {
  id: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  actorType: ActorType.Obstacle,
  groupId: dungeonGroupId
}

export const treasureActor: ITreasure & IReusable = {
  id: "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
  actorType: ActorType.Treasure,
  utilizationCost: [
    {
      costValue: 1,
      costType: 'majorAction'
    }
  ],
  interactionType: [InteractionType.Reusable],
  isOpened: false,
  groupId: dungeonGroupId
}

export const dungeonExitActor: IDungeonExit & IReusable = {
  id: "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
  actorType: ActorType.DungeonExit,
  utilizationCost: [],
  interactionType: [InteractionType.Reusable],
  applyExitBonus: false,
  groupId: dungeonGroupId
}