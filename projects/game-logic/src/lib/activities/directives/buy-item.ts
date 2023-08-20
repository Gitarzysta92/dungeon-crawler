import { IPurchasable } from "../../features/interactions/interactions.interface";
import { IItem } from "../../features/items/items.interface";
import { IGameFeed } from "../../game/game.interface";
import { AdventureActivityName } from "../constants/activity-name";
import { AdventureState } from "../../game/adventure-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { ICharacter } from "../../features/actors/actors.interface";
import { IPossesedItem } from "../../features/items/inventory.interface";
import { Inventory } from "../../features/items/inventory";


export const buyItem = (payload: { item: IItem & IPurchasable & IPossesedItem, amount: number, vendor: ICharacter }): IDispatcherDirective =>
  (state: AdventureState, feed: IGameFeed) => {

    const areas = state.adventureMap.getAllAvailableAreas(state.hero.occupiedAreaId);
    if (!areas.some(a => a.id === payload.vendor.assignedAreaId)) {
      throw new Error("Hero is not in the same area as given character");
    }

    const characterInventory = payload.vendor.inventory as Inventory;
    const purchasedItem = characterInventory.getItem(payload.item); 
    if (!purchasedItem || purchasedItem.amountInStack < payload.amount) {
      throw new Error("Character has not possessing given item");
    }
    
    const transactionCost = payload.item.buyBasePrice * payload.amount;
    const heroGoldStack = state.heroInventory.getCurrency(payload.item.purchaseCurrency);
    if (!heroGoldStack || heroGoldStack?.amountInStack < transactionCost) {
      throw new Error("No sufficiend amount of currency")
    }

    state.heroInventory.reduceCurrencyAmount(transactionCost, payload.item.purchaseCurrency);
    state.heroInventory.addItem(Object.assign({}, payload.item), payload.amount);
    characterInventory.removeItem(payload.item, payload.amount);

    return [{
      name: AdventureActivityName.BuyItem,
      payload: payload,
    }]
  }