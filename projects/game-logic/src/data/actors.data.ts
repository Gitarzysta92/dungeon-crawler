import { IActor, IBasicStats, IDungeonExit, IEnemy, IObstacle, ITreasure } from "../lib/features/actors/actors.interface"
import { ActorType } from "../lib/features/actors/actors.constants"
import { InteractionType, IReusable } from "../lib/features/interactions/interactions.interface"
import { IAffectable } from "../lib/features/effects/effects.interface"
import { IEffect } from "../lib/features/effects/effect-commons.interface"

export const ratActor: IEnemy & IBasicStats & IAffectable<IEffect> = {
  id: "88275863-48C3-4E13-B7CF-CA1A52539F1D",
  actorType: ActorType.Enemy,
  health: 20,
  defence: 0,
  attackPower: 10,
  spellPower: 0,
  effects: [],
  healthUpperLimit: 20,
  defenceUpperLimit: 0,
  attackPowerUpperLimit: 10,
  spellPowerUpperLimit: 0,
}

export const obstacleActor: IObstacle = {
  id: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  actorType: ActorType.Obstacle,
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
  isOpened: false
}

export const dungeonExitActor: IDungeonExit & IReusable = {
  id: "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
  actorType: ActorType.DungeonExit,
  utilizationCost: [],
  interactionType: [InteractionType.Reusable],
  applyExitBonus: false
}