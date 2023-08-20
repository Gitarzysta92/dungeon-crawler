import { InventorySlotType } from "../../features/items/inventory.constants";
import { IItemSlot, IPossesedItem } from "../../features/items/inventory.interface";
import { IItem } from "../../features/items/items.interface";
import { AdventureState } from "../../game/adventure-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const moveInventoryItem = (payload: { item: IItem & IPossesedItem, amount: number, slot: IItemSlot }): IDispatcherDirective =>
  (state: AdventureState, feed: IGameFeed) => {

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
      name: AdventureActivityName.BuyItem,
      payload: payload,
    }]
  }



  // if ((item as unknown as IEquipable).isEquipped) {
  //   return unequipItem({
  //     item: payload.item as typeof payload.item & IEquipable
  //   }).call(this, state)
  // }