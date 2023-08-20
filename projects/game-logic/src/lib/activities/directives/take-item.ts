import { resolveCostAndInteraction } from "../../features/interactions/interactions";
import { IItemSlot, IPossesedItem } from "../../features/items/inventory.interface";
import { IItem } from "../../features/items/items.interface";
import { AdventureState } from "../../game/adventure-state";
import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const takeItem = (payload: { item: IItem & IPossesedItem, amount: number, slot: IItemSlot }): IDispatcherDirective =>
  (state: AdventureState | DungeonState, feed: IGameFeed) => {

    state.heroInventory.addItem(payload.item, payload.amount, payload.slot)

    return [{
      name: AdventureActivityName.SellItem,
      payload: payload,
    }]
  }