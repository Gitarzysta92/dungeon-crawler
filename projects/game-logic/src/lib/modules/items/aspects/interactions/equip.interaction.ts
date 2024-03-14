import { IInteractionDeclaration, IInteractionHandler } from "../../../../cross-cutting/interaction/interaction.interface";
import { IInventoryBearer } from "../../entities/bearer/inventory-bearer.interface";
import { IInventorySlot } from "../../entities/inventory-slot/inventory-slot.interface";
import { IEquipableItem } from "../../entities/item/item.interface";


export const EQUIP_INTERACTION_IDENTIFIER = "EQUIP_INTERACTION_IDENTIFIER";

export interface IEquipInteraction extends IInteractionDeclaration {
  id: typeof EQUIP_INTERACTION_IDENTIFIER,
  slot?: IInventorySlot
}

export class EquipInteractionHandler implements IInteractionHandler {
  delegateId = EQUIP_INTERACTION_IDENTIFIER;

  public isApplicableTo(d: IInteractionDeclaration): boolean {
    throw new Error("Method not implemented.");
  }

  public resolveInteraction(initiator: IInventoryBearer, item: IEquipableItem, interaction: IEquipInteraction): boolean {
    if (interaction.slot && !initiator.inventory.hasSlot(interaction.slot)) {
      return false;
    }

    item.equip(interaction.slot);
  }
}

