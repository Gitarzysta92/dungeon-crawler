import { calculateTravelSuppliesToConsume } from "../../../../../framework/modules/area/adventure";
import { ITravelSupply } from "../../../../../framework/modules/area/travel/travel.interface";
import { IRootArea } from "../../../../../framework/modules/area/area.interface";
import { IPossesedItem } from "../../../../../framework/modules/item/inventory/inventory.interface";
import { IItem } from "../../../../../framework/modules/item/item.interface";
import { AdventureGameplay } from "../../../adventure/adventure-gameplay";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { AdventureActivityName } from "../activity.constants";

export const travel = (payload: { targetArea: IRootArea, travelSupplies?: (IItem & ITravelSupply & IPossesedItem)[] }): IDispatcherDirective =>
  async (state: AdventureGameplay, feed: IGameFeed) => {
    
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