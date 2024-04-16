import { IInventorySlot } from "../../../../../framework/modules/item/inventory/inventory.interface";
import { IItem, IPossesedItem } from "../../../../../framework/modules/item/item.interface";
import { AdventureGameplay } from "../../adventure/adventure-gameplay";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { AdventureActivityName } from "./activity.constants";
import { IAdventureGameplayFeed } from "../../adventure/adventure-gameplay.interface";
import { IActivityContext } from "../../../../base/activity/activity.interface";
import { DungeonGameplayLogicState } from "../../../../../gameplay/state/dungeon/dungeon-gameplay";
import { IDungeonGameplayFeed } from "../../../../../gameplay/state/dungeon/dungeon-gameplay.interface";
import { Actor } from "../../../../../framework/modules/actor/actor";
import { InventoryBearer } from "../../../../../framework/modules/item/bearer/inventory-bearer";

export const moveInventoryItem = (payload: { item: IItem & IPossesedItem, amount: number, slot: IInventorySlot }): IDispatcherDirective =>
  async (
    state: AdventureGameplay | DungeonGameplayLogicState,
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

    const item = actor.possessItem(payload.item);
    if (!item) {
      throw new Error("Hero do not posses given item in the inventory");
    }

    actor.inventory.moveItem(payload.item, payload.amount, payload.slot);

    return {
      name: AdventureActivityName.MoveInventoryItem,
      payload: payload,
    }
  }