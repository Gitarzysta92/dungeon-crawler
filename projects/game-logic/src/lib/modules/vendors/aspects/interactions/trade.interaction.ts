import { IInteractionDeclaration, IInteractionHandler } from "../../../../cross-cutting/interaction/interaction.interface";
import { ITradable } from "../../entities/tradable/trade.interface";

export const TRADE_INTERACTION = "TRADE_INTERACTION"

export interface ITradeInteraction extends IInteractionDeclaration {
  id: typeof TRADE_INTERACTION,
}

export class TradeInteractionHandler implements IInteractionHandler {
  delegateId = TRADE_INTERACTION;
 
  public isApplicableTo(d: IInteractionDeclaration): boolean {
    return this.delegateId === d.delegateId;
  }

  public resolveInteraction(initiator: unknown, subject: ITradable, interaction: ITradeInteraction): boolean {
    return true;
  }
}
