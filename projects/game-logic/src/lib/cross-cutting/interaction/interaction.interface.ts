export interface IInteraction {
  id: string;
  cost?: IInteractionCost[];
  isNotaffective?: boolean;
}

export interface IInteractionCost {
  resourceId: string,
  value: number;
}

export interface IInteractionResource {
  id: string;
  value: number;
  isResource: true;
}

export interface IInteractionSubject {
  interaction: IInteraction[];
}


export interface IInteractionHandler<T extends IInteraction> {
  interactionId: string;
  resolveInteraction: (initiator: unknown, subject: unknown, interaction: T) => boolean;
}