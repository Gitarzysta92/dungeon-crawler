import { IInventorySlot } from "../../../../../framework/modules/item/inventory/inventory.interface";
import { IEquipable, IPossesedItem } from "../../../../../framework/modules/item/item.interface";
import { AdventureGameplay } from "../../adventure/adventure-gameplay";
import { DungeonGameplay } from "../state/dungeon/dungeon-gameplay";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { AdventureActivityName } from "./activity.constants";
import { Item } from "../../../../../framework/modules/item/item";
import { IActivityContext } from "./activity.interface";
import { IAdventureGameplayFeed } from "../../adventure/adventure-gameplay.interface";
import { IDungeonGameplayFeed } from "../state/dungeon/dungeon-gameplay.interface";
import { Actor } from "../../../../../framework/modules/actor/actor";
import { EQUIP_INTERACTION_IDENTIFIER } from "../../../../../framework/modules/item/interactions/equip.interaction";
import { InventoryBearer } from "../../../../../framework/modules/item/bearer/inventory-bearer";


export const equipItem = (payload: { item: Item & IPossesedItem & IEquipable, slots?: IInventorySlot[] }): IDispatcherDirective =>
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

    state.interactionService.resolveInteraction(EQUIP_INTERACTION_IDENTIFIER, payload.item, actor);

    actor.equipItem(payload.item, payload.slots);
    
    return {
      name: AdventureActivityName.EquipItem,
      payload: payload,
    }
  }