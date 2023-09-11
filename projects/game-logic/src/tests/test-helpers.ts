import { firstAreaTavernId } from "../data/common-identifiers.data";
import { hero, heroInventory } from "../data/commons.data";
import { dataFeed } from "../data/feed.data";
import { curse, fireball, healing, meleeAttack, meteorShower, move, teleport, vision, weakness } from "../data/skills-and-spells.data";
import { removeActorsWithZeroHealth } from "../lib/features/actors/actors";
import { StateFactory } from "../lib/game/state.factory";
import { StateDispatcher } from "../lib/utils/state-dispatcher/state-dispatcher";

export function createStateDispatcher() {
  return new StateDispatcher({
    context: dataFeed,
    preDirectiveMutators: [],
    postDirectiveMutators: [removeActorsWithZeroHealth]
  });
}

export function createAdventureState() {
  return StateFactory.createAdventureState({
    hero: hero,
    occupiedAreaId: firstAreaTavernId,
    heroInventory: heroInventory,
    heroProgression: {} as any,
    heroSpellsAndAbilities: {
      learnedIds: [
        meleeAttack.id,
        move.id,
        fireball.id,
        teleport.id,
        healing.id,
        vision.id,
        weakness.id,
        curse.id,
        meteorShower.id
      ],
      preparedIds: [
        meleeAttack.id,
        move.id,
        fireball.id,
        teleport.id,
        healing.id,
        vision.id,
        weakness.id,
        curse.id,
        meteorShower.id
      ]
    },
    ...dataFeed,
  });
}