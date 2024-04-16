import { IActivityDeclaration } from "../../../../base/activity/activity.interface";
import { IInventoryBearer } from "../../entities/bearer/inventory-bearer.interface";
import { IInventorySlot } from "../../entities/inventory-slot/inventory-slot.interface";
import { IEquipableItem } from "../../entities/item/item.interface";


export const EQUIP_ACTIVITY = "EQUIP_ACTIVITY";

export interface IEquipInteraction extends IActivityDeclaration {
  id: typeof EQUIP_ACTIVITY,
  slot?: IInventorySlot
}

export class EquipInteractionHandler implements IActivityHandler {
  delegateId = EQUIP_ACTIVITY;

  public isApplicableTo(d: IActivityDeclaration): boolean {
    throw new Error("Method not implemented.");
  }

  public resolveInteraction(initiator: IInventoryBearer, item: IEquipableItem, interaction: IEquipInteraction): boolean {
    if (interaction.slot && !initiator.inventory.hasSlot(interaction.slot)) {
      return false;
    }

    item.equip(interaction.slot);
  }
}

