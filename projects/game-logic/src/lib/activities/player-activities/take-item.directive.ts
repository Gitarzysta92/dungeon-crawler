import { IItemSlot, IPossesedItem } from "../../features/items/inventory.interface";
import { IItem } from "../../features/items/items.interface";
import { AdventureState } from "../../game/adventure-state";
import { DungeonState } from "../../game/dungeon-state";
import { GameLayer } from "../../game/game.constants";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName, DungeonActivityName } from "../constants/activity-name";

export const takeItem = (payload: { item: IItem & IPossesedItem, amount: number, slot: IItemSlot }): IDispatcherDirective =>
  async (state: AdventureState | DungeonState, feed: IGameFeed) => {

    state.heroInventory.addItem(payload.item, payload.amount, payload.slot)

    return [{
      name: state.gameLayer === GameLayer.Adventure ? AdventureActivityName.TakeItem : DungeonActivityName.TakeItem,
      payload: payload,
    }]
  }