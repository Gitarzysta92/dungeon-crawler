import { firstAreaTavernId } from "../data/common-identifiers.data";
import { hero, heroInventory } from "../data/commons.data";
import { dataFeed } from "../data/feed.data";
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
      learnedIds: [],
      preparedIds: []
    },
    ...dataFeed,
  });
}