
import { IPurchasable } from "../../game/interactions.interface";
import { IItem } from "../../features/items/items.interface";
import { IGameFeed } from "../../game/game.interface";
import { AdventureActivityName } from "../constants/activity-name";
import { AdventureState } from "../../game/adventure-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { ICharacter } from "../../features/actors/actor";
import { IPossesedItem } from "../../features/items/inventory.interface";


export const sellItem = (payload: { item: IItem & IPurchasable & IPossesedItem, amount: number, toCharacter: ICharacter }): IDispatcherDirective =>
  (state: AdventureState, feed: IGameFeed) => {

    if (!state.heroInventory.getItem(payload.item)) {
      throw new Error("Hero do not posses given item");
    }
   
    const areaId = state.characters[payload.toCharacter.id].assignedAreaId;
    if (state.hero .occupiedAreaId !== areaId) {
      throw new Error("Hero is not in the same area as given character");
    }

    const selledItem = state.heroInventory.getItem(payload.item); 
    if (!selledItem || selledItem.amountInStack < payload.amount) {
      throw new Error("Character has not possessing given item");
    }
    
    const transactionCost = payload.item.sellBasePrice * payload.amount;
    const characterInventory = state.characters[payload.toCharacter.id].inventory;
    state.heroInventory.increaseCurrencyAmount(transactionCost, payload.item.purchaseCurrency);
    state.heroInventory.removeItem(payload.item, payload.amount);
    characterInventory.addItem(payload.item, payload.amount);

    return [{
      name: AdventureActivityName.SellItem,
      payload: payload,
    }]
  }