import { equipableSlotTypes } from "../../features/items/inventory.constants";
import { IPossesedItem } from "../../features/items/inventory.interface";
import { IItem } from "../../features/items/items.interface";
import { AdventureGlobalState } from "../../gameplay/adventure/adventure-state";
import { DungeonGameplayState } from "../../gameplay/dungeon/dungeon-global-state";
import { IGameFeed } from "../../states/game.interface";
import { IEquipable } from "../../features/interactions/interactions.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";


export const unequipItem = (payload: { item: IItem & IEquipable & IPossesedItem }): IDispatcherDirective =>
  (state: AdventureGlobalState | DungeonGameplayState, feed: IGameFeed) => {
    const item = state.heroInventory.getItem(payload.item); 

    if (!item) {
      throw new Error("Hero do not posses given item");
    }

    const itemIsNotEquipped = state.heroInventory.slots
      .filter(s => equipableSlotTypes.some(est => s.slotType === est))
      .every(s => s.getAssociatedItem()?.id !== item.id);
    
    if (itemIsNotEquipped) {
      throw new Error("Given item is not equipped");  
    }

    state.heroInventory.removeItem(payload.item, 1);
    state.heroInventory.addItem(payload.item, 1);

    return [{
      name: AdventureActivityName.UnequipItem,
      payload: payload,
    }]
  }