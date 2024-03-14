import { IInteractionDeclaration, IInteractionHandler } from "../../../../cross-cutting/interaction/interaction.interface";
import { IArea } from "../../entities/area/area.interface";
import { IAreaOccupier } from "../../entities/occupier/occupier.interface";


export const TRAVEL_INTERACTION = "TRAVEL_INTERACTION";

export interface ITravelInteraction extends IInteractionDeclaration {
  id: typeof TRAVEL_INTERACTION,
}

export class TravelInteractionHandler implements IInteractionHandler {
  delegateId = TRAVEL_INTERACTION;

  public isApplicableTo(d: IInteractionDeclaration): boolean {
    return this.delegateId === d.delegateId;
  }

  public resolveInteraction(initiator: IAreaOccupier, subject: IArea, interaction: ITravelInteraction): boolean {
    return true;
  }
}