import { InventorySlotType } from "../../features/items/inventory.constants";
import { IItemSlot, IPossesedItem } from "../../features/items/inventory.interface";
import { IItem } from "../../features/items/items.interface";
import { AdventureGlobalState } from "../../gameplay/adventure/adventure-state";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const moveInventoryItem = (payload: { item: IItem & IPossesedItem, amount: number, slot: IItemSlot }): IDispatcherDirective =>
  (state: AdventureGlobalState, feed: IGameFeed) => {

    const item = state.heroInventory.getItem(payload.item);
    if (!item) {
      throw new Error("Hero do not posses given item in the inventory");
    }

    if (payload.slot.slotType !== InventorySlotType.Common) {
      throw new Error("Item can be moved only between common slots")
    }

    state.heroInventory.removeItem(item, payload.amount);
    state.heroInventory.addItem(item, payload.amount, payload.slot);

    return [{
      name: AdventureActivityName.MoveInventoryItem,
      payload: payload,
    }]
  }