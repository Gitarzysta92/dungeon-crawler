import { consumeResources } from "../../features/action/actions";
import { IAction } from "../../features/action/actions.interface";
import { InventorySlotType } from "../../features/items/inventory.constants";
import { IItemSlot, IPossesedItem } from "../../features/items/inventory.interface";
import { IItem } from "../../features/items/items.interface";
import { AdventureState } from "../../game/adventure-state";
import { DungeonState } from "../../game/dungeon-state";
import { GameLayer } from "../../game/game.constants";
import { IGameFeed } from "../../game/game.interface";
import { IEquipable } from "../../game/interactions.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";


export const equipItem = (payload: { item: IItem & IAction & IEquipable & IPossesedItem, slots?: IItemSlot[] }): IDispatcherDirective =>
  (state: AdventureState | DungeonState, feed: IGameFeed) => {

    const item = state.heroInventory.getItem(payload.item);
    if (!item) {
      throw new Error("Hero do not posses given item in the inventory");
    }

    let slots = [];

    if (!!payload.slots && payload.slots?.length > 0) {
      slots = state.heroInventory.slots.filter(s => payload.slots!.some(ps => ps.id === s.id))
    } else {
      slots = state.heroInventory.getAllSpecifiedSlots(payload.item.requiredSlots)
    }

    const numberOfRequiredSlots = payload.item.requiredSlots.reduce((a, c) => a += c.amount, 0);
    if (slots.length < numberOfRequiredSlots) {
      throw new Error(`Cannot find all required slots for given item`);
    }

    const isDungeon = state.gameLayerName === GameLayer.Dungeon;
    if (isDungeon) {
      const reducedStats = consumeResources(payload.item.equipCost, state.hero);
      if (!reducedStats) {
        throw new Error("Hero has not sufficient amount of resources");
      }  
    }

    state.heroInventory.removeItem(payload.item, 1);

    const associatedItems = state.heroInventory.getAllAssociatedItems(slots);
    for (let associatedItem of associatedItems) {
      state.heroInventory.removeItem(associatedItem, 1);
      state.heroInventory.addItem(associatedItem, 1);
      (associatedItem as unknown as IEquipable).isEquipped = false; 
    }

    state.heroInventory.addItem(payload.item, 1, slots);
    payload.item.isEquipped = true;

    return [{
      name: AdventureActivityName.EquipItem,
      payload: payload,
    }]
  }