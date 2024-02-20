import { IEquipable, IPossesedItem } from "../../../../../framework/modules/item/item.interface";
import { AdventureGameplay } from "../../adventure/adventure-gameplay";
import { DungeonGameplay } from "../../dungeon/state/dungeon-gameplay";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { AdventureActivityName } from "./activity.constants";
import { Actor } from "../../../../../framework/modules/actor/actor";
import { InventoryBearer } from "../../../../../framework/modules/item/inventory/inventory-bearer";
import { IInventorySlot } from "../../../../../framework/modules/item/inventory/inventory.interface";
import { IActivityContext } from "./activity.interface";
import { IAdventureGameplayFeed } from "../../adventure/adventure-gameplay.interface";
import { IDungeonGameplayFeed } from "../../dungeon/state/dungeon-gameplay.interface";
import { Item } from "../../../../../framework/modules/item/item";


export const unequipItem = (payload: { item: Item & IEquipable & IPossesedItem, slots?: IInventorySlot[] }): IDispatcherDirective =>
  async (
    state: AdventureGameplay | DungeonGameplay,
    context: IActivityContext<IAdventureGameplayFeed | IDungeonGameplayFeed>
  ) => {

    const actor = state.actorsService.getActor<Actor & Partial<InventoryBearer>>(context.getControlledActorId());
    if (!actor.isInGroup(context.authority.groupId)) {
      throw new Error();
    }

    if (!actor.isInventoryBearer) {
      throw new Error("Actor has no inventory");
    }

    if (actor.possessItem(payload.item, 1)) {
      throw new Error("Actor do not posses given item in the inventory");
    }

    actor.unequipItem(payload.item, payload.slots);
    
    return {
      name: AdventureActivityName.EquipItem,
      payload: payload,
    }
  }