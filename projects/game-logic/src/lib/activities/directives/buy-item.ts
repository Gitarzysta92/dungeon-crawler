import { IPurchasable } from "../../game/interactions.interface";
import { IItem } from "../../features/items/items.interface";
import { IGameFeed } from "../../game/game.interface";
import { AdventureActivityName } from "../constants/activity-name";
import { AdventureState } from "../../game/adventure-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { ICharacter } from "../../features/actors/actor";
import { IPossesedItem } from "../../features/items/inventory.interface";


export const buyItem = (payload: { item: IItem & IPurchasable & IPossesedItem, amount: number, fromCharacter: ICharacter }): IDispatcherDirective =>
  (state: AdventureState, feed: IGameFeed) => {

    const areaId = state.characters[payload.fromCharacter.id].assignedAreaId;
    if (state.hero.occupiedAreaId !== areaId) {
      throw new Error("Hero is not in the same area as given character");
    }

    const characterInventory = state.characters[payload.fromCharacter.id].inventory;
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