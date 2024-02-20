import { IInteraction, IInteractionHandler } from "../../../cross-cutting/interaction/interaction.interface";
import { IInventoryBearer } from "../../item/inventory/inventory-bearer.interface";
import { ITradable } from "../trade.interface";

export const TRADE_INTERACTION_IDENTIFIER = "TRADE_INTERACTION_IDENTIFIER"

export interface ITradeInteraction extends IInteraction {
  id: typeof TRADE_INTERACTION_IDENTIFIER,
}

export class TradeInteractionHandler implements IInteractionHandler<ITradeInteraction> {
  interactionId: string = typeof TRADE_INTERACTION_IDENTIFIER;

  public resolveInteraction(initiator: IInventoryBearer, subject: ITradable, interaction: ITradeInteraction): boolean {
    return true;
  }
}

// export class UtilizationInteraction implements IInteractionHandler<IEquipInteraction> {
//   public resolveInteraction(initiator: IInventoryBearer, subject: IEquipable, interaction: IEquipInteraction, ): boolean {
//     return true;
//   }
// }