import { IInventorySlot } from "../../../../../framework/modules/item/inventory/inventory.interface";
import { IItem } from "../../../../../framework/modules/item/item.interface";
import { AdventureGameplay } from "../../adventure/adventure-gameplay";
import { DungeonGameplay } from "../state/dungeon/dungeon-gameplay";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { AdventureActivityName, DungeonActivityName } from "./activity.constants";

export const collectItems = (payload: {
  items: { item: Item & Tradable, amount: number}
  source: Actor & AreaObject & InventoryBearer
}): IDispatcherDirective =>
  async (state: AdventureGameplay | DungeonGameplay, feed: IGameFeed) => {

    state.heroInventory.addItem(payload.item, payload.amount, payload.slot)

    return [{
      name: state.gameLayer === GameLayer.Adventure ? AdventureActivityName.TakeItem : DungeonActivityName.TakeItem,
      payload: payload,
    }]
  }