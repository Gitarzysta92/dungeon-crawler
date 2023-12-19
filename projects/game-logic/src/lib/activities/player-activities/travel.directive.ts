import { calculateTravelSuppliesToConsume } from "../../features/adventure/adventure";
import { ITravelSupply } from "../../features/adventure/adventure.interface";
import { IArea } from "../../features/adventure/area.interface";
import { IPossesedItem } from "../../features/items/inventory.interface";
import { IItem } from "../../features/items/items.interface";
import { AdventureGlobalState } from "../../gameplay/adventure/adventure-state";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const travel = (payload: { targetArea: IArea, travelSupplies?: (IItem & ITravelSupply & IPossesedItem)[] }): IDispatcherDirective =>
  async (state: AdventureGlobalState, feed: IGameFeed) => {
    
    if (state.hero.occupiedAreaId === payload.targetArea.id) {
      throw new Error('You are already in given area');
    }

    const connection = state.adventureMap.getTravelDetails(state.hero.occupiedAreaId, payload.targetArea.id)
    if (!connection) {
      throw new Error('There is no connection to given area');
    }

    if (!state.adventureMap.validateAreaAccessibility(payload.targetArea)) {
      throw new Error('Your hero does not matching access conditions for given area');
    }

    const travelSupplies = payload.travelSupplies || state.heroInventory
      .getAllItems<IItem & ITravelSupply>()
      .filter(i => !!i.coverableDistance);
    
    const maxCoverableDistance = travelSupplies.reduce((n, s) => n += (s.coverableDistance * s.amountInStack), 0);
    if (maxCoverableDistance < connection.distance) {
      throw new Error("Not enough supplies to make a travel")
    }

    const suppliesToConsume = calculateTravelSuppliesToConsume(connection.distance, travelSupplies);

    for (let sup of suppliesToConsume) {
      state.heroInventory.removeItem(sup.item, sup.amount)
    }

    state.adventureMap.markAreaAsVisited(payload.targetArea);

    return [{
      name: AdventureActivityName.Travel,
      payload: payload,
    }]
  }