import { IInteraction, IInteractionHandler } from "../../../../cross-cutting/interaction/interaction.interface";
import { IInventoryBearer } from "../../bearer/inventory-bearer.interface";
import { IEquipable } from "../../item.interface";


export const EQUIP_INTERACTION_IDENTIFIER = "EQUIP_INTERACTION_IDENTIFIER"

export interface IEquipInteraction extends IInteraction {
  id: typeof EQUIP_INTERACTION_IDENTIFIER,
}

export class EquipInteractionHandler implements IInteractionHandler<IEquipInteraction> {
  interactionId: string = typeof EQUIP_INTERACTION_IDENTIFIER;

  public resolveInteraction(initiator: IInventoryBearer, subject: IEquipable, interaction: IEquipInteraction): boolean {
    return true;
  }
}

// export class UtilizationInteraction implements IInteractionHandler<IEquipInteraction> {
//   public resolveInteraction(initiator: IInventoryBearer, subject: IEquipable, interaction: IEquipInteraction, ): boolean {
//     return true;
//   }
// }