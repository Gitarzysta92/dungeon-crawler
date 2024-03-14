import { IInteractionDeclaration, IInteractionHandler } from "../../../cross-cutting/interaction/interaction.interface";
import { ITradable } from "../trade.interface";

export const TRADE_INTERACTION_IDENTIFIER = "TRADE_INTERACTION_IDENTIFIER"

export interface ITradeInteraction extends IInteractionDeclaration {
  id: typeof TRADE_INTERACTION_IDENTIFIER,
}

export class TradeInteractionHandler implements IInteractionHandler {
  isApplicableTo(d: IInteractionDeclaration): boolean {
    throw new Error("Method not implemented.");
  }
  delegateId: string;
  interactionId: string = typeof TRADE_INTERACTION_IDENTIFIER;

  public resolveInteraction(initiator: unknown, subject: ITradable, interaction: ITradeInteraction): boolean {
    return true;
  }
}

// export class UtilizationInteraction implements IInteractionHandler<IEquipInteraction> {
//   public resolveInteraction(initiator: IInventoryBearer, subject: IEquipable, interaction: IEquipInteraction, ): boolean {
//     return true;
//   }
// }