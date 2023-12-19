
import { IPurchasable } from "../../features/interactions/interactions.interface";
import { IItem } from "../../features/items/items.interface";
import { AdventureActivityName } from "../constants/activity-name";
import { AdventureGlobalState } from "../../gameplay/adventure/adventure-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { ICharacter } from "../../features/actors/actors.interface";
import { IPossesedItem } from "../../features/items/inventory.interface";
import { Inventory } from "../../features/items/inventory";
import { IGameplayFeed } from "../../gameplay/gameplay-feed.interface";


export const sellItem = (payload: { item: IItem & IPurchasable & IPossesedItem, amount: number, vendor: ICharacter }): IDispatcherDirective =>
  async (state: AdventureGlobalState, feed: IGameplayFeed) => {

    if (!state.heroInventory.getItem(payload.item)) {
      throw new Error("Hero do not posses given item");
    }
   
    const areas = state.adventureMap.getAllAvailableAreasRelatedToArea(state.hero.occupiedAreaId);
    if (!areas.some(a => a.id === payload.vendor.assignedAreaId)) {
      throw new Error("Hero is not in the same area as given character");
    }

    const selledItem = state.heroInventory.getItem(payload.item); 
    if (!selledItem || selledItem.amountInStack < payload.amount) {
      throw new Error("Character has not possessing given item");
    }
    
    const transactionCost = payload.item.sellBasePrice * payload.amount;
    const characterInventory = payload.vendor.inventory as Inventory;
    state.heroInventory.increaseCurrencyAmount(transactionCost, payload.item.purchaseCurrency);
    state.heroInventory.removeItem(payload.item, payload.amount);
    characterInventory.addItem(payload.item, payload.amount);

    return [{
      name: AdventureActivityName.SellItem,
      payload: payload,
    }]
  }