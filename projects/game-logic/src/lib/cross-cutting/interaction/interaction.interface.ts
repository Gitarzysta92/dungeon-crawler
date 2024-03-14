import { IDelegateDeclaration, IDelegateHandler } from "../../base/delegate/delegate.interface";

export interface IInteractionDeclaration extends IDelegateDeclaration {
  cost?: IInteractionCost[];
  isNotaffective?: boolean;
}

export interface IInteractionCost {
  resourceId: string,
  value: number;
}

export interface IInteractionResource {
  id: string;
  value?: number;
  isResource: true;
}


export interface IInteractionResourceProvider {
  validateInteractionResources(d: IInteractionCost[]): boolean;
  consumeInteractionResources(d: IInteractionCost[]): void;
}


export interface IInteractionSubject {
  interaction: IInteractionDeclaration[];
}


export interface IInteractionHandler extends IDelegateHandler {
  isApplicableTo(d: IInteractionDeclaration): boolean
  resolveInteraction(initiator: unknown, subject: unknown, interaction: IInteractionDeclaration): boolean;
}