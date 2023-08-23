import { IDictionary } from "../../extensions/types";
import { IArea } from "../adventure/area.interface";
import { Board } from "../board/board";
import { IBoardObject } from "../board/board.interface";
import { RewardsTracker } from "../rewards/rewards-tracker";
import { IRewarding } from "../rewards/rewards.interface";
import { ActorType } from "./actors.constants";
import { IActor, ICharacter, IEnemy } from "./actors.interface";


export function removeActorsWithZeroHealth(allActorsFromState: (IActor & IBoardObject)[], board: Board): void { 
  for (let actor of allActorsFromState) {
    if ('health' in actor && actor.health === 0) {
      board.unassignObject(actor);
    }
  }
}

export function gainRewardsForKillingEnemies(
  allActorsFromState: (IEnemy & IRewarding)[],
  rewardsTracker: RewardsTracker
): void  {
  for (let actor of allActorsFromState) {
    if ('health' in actor && actor.health === 0 && actor.actorType === ActorType.Enemy && !!actor.rewards) {
      for (let reward of actor.rewards) {
        rewardsTracker.registerReward(reward);
      }
    }
  }
}

export function introduceCharacter(
  characters: IDictionary<`${ICharacter['id']}:${IArea['id']}`, ICharacter & { assignedAreaId: string }>,
  character: ICharacter
) {
  if (!characters[character.id + character.assignedAreaId]) {
    characters[character.id + character.assignedAreaId] = character;
  }
}


export function calculateStatsDifference<T extends object>(source: T, target: T): number {
  return getStatsDifferences(source, target).reduce((c, s) => c += s.value, 0)
}

export function getStatsDifferences<T extends object>(source: T, target: T): { statName: string, value: number }[] {
  return Object.entries(source).reduce((c, s) =>
    c.concat({ statName: s[0], value: target[s[0] as keyof typeof target] as number - s[1] }), [] as { statName: string, value: number }[])
}