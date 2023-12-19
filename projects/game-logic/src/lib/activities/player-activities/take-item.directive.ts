import { IItemSlot, IPossesedItem } from "../../features/items/inventory.interface";
import { IItem } from "../../features/items/items.interface";
import { AdventureGlobalState } from "../../gameplay/adventure/adventure-state";
import { DungeonGlobalState } from "../../gameplay/dungeon/dungeon-global-state";
import { GameLayer } from "../../states/game.constants";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName, DungeonActivityName } from "../constants/activity-name";

export const takeItem = (payload: { item: IItem & IPossesedItem, amount: number, slot: IItemSlot }): IDispatcherDirective =>
  async (state: AdventureGlobalState | DungeonGlobalState, feed: IGameFeed) => {

    state.heroInventory.addItem(payload.item, payload.amount, payload.slot)

    return [{
      name: state.gameLayer === GameLayer.Adventure ? AdventureActivityName.TakeItem : DungeonActivityName.TakeItem,
      payload: payload,
    }]
  }