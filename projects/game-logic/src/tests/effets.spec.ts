import { firstAreaTavernId } from "../data/common-identifiers.data";
import { hero, heroInventory } from "../data/commons.data";
import { dungeon } from "../data/dungeon.data";
import { dataFeed } from "../data/feed.data";
import { removeActorsWithZeroHealth } from "../lib/features/actors/actors";
import { AdventureState } from "../lib/game/adventure-state";
import { DungeonState } from "../lib/game/dungeon-state";
import { StateFactory } from "../lib/game/state.factory";
import { StateDispatcher } from "../lib/utils/state-dispatcher/state-dispatcher";

describe('effects', () => {
  const stateDispatcher = new StateDispatcher({
    context: dataFeed,
    preDirectiveMutators: [],
    postDirectiveMutators: [removeActorsWithZeroHealth]
  });
  
  let adventureState: AdventureState;
  let dungeonState: DungeonState;

  beforeEach(() => {
    adventureState = StateFactory.createAdventureState({
      hero: hero,
      occupiedAreaId: firstAreaTavernId,
      heroInventory: heroInventory,
      ...dataFeed
    });
    dungeonState = StateFactory.createDungeonState(adventureState, dataFeed, dungeon);
  });

});