import { IActor, IBasicStats } from "../lib/features/actors/actor"
import { ActorType } from "../lib/features/actors/actor.constants"
import { IBoardObject } from "../lib/features/board/board.interface"
import { InteractionType, IUsable } from "../lib/game/interactions.interface"

export const rat: IActor & IBoardObject & IBasicStats = {
  id: "88275863-48C3-4E13-B7CF-CA1A52539F1D",
  name: "Rat",
  actorType: ActorType.Enemy,
  groupId: "",
  health: 20,
  attackPower: 10,
  spellPower: 0,
  position: { r: 0, q: 0, s: 0 },
  rotation: 0,
}

export const obstacle: IActor & IBoardObject = {
  id: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  actorType: ActorType.Obstacle,
  name: "Obstacle",
  groupId: "",
  position: { r: 0, q: 0, s: 0 },
  rotation: 0
}

export const treasure: IActor & IBoardObject & IUsable = {
  id: "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
  name: "Treasure",
  actorType: ActorType.Treasure,
  targetType: ActorType.Hero,
  useCost: [
    {
      costValue: 1,
      costType: 'majorAction'
    }
  ],
  groupId: '',
  interactionType: [InteractionType.Usable],
  rotation: 0,
  position: { r: 0, q: 0, s: 0 },
}
