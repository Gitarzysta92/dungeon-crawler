import { dataFeed } from "../data/feed.data";;
import { removeActorsWithZeroHealth } from "../lib/features/actors/actors";
import { StateFactory } from "../lib/states/state.factory";
import { StateDispatcher } from "../lib/utils/state-dispatcher/state-dispatcher";

export function createStateDispatcher() {
  return new StateDispatcher({
    context: dataFeed,
    preDirectiveMutators: [],
    postDirectiveMutators: [removeActorsWithZeroHealth]
  });
}

export function createAdventureState() {
  return StateFactory.createAdventureState(heroTemplate);
}