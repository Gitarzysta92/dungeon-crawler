import { dataFeed } from "../gameplay/data/feed.data";;
import { removeActorsWithZeroHealth } from "../framework/modules/actor/actors";
import { StateFactory } from "../framework/states/state.factory";
import { StateDispatcher } from "../framework/base/state/state-dispatcher";

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