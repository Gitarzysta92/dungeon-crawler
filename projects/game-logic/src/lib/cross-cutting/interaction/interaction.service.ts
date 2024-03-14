import { Guid } from "../../extensions/types";
import { IEntity } from "../../base/entity/entity.interface";
import { IInteractionHandler, IInteractionSubject } from "./interaction.interface";
import { DelegateService } from "../../base/delegate/delegate.service";

export class InteractionsService extends DelegateService<IInteractionHandler> {

  private _interactionResolvers: Map<string, IInteractionHandler> = new Map();

  public registerInteractionResolver(resolver: IInteractionHandler): void {
    this._interactionResolvers.set(resolver.delegateId, resolver);
  }

  public resolveInteraction(
    interactionId: Guid,
    subject: IInteractionSubject & Partial<IEntity>,
    initiator: unknown
  ): void {
    const interaction = subject.interaction.find(i => i.delegateId === interactionId);
    if (interaction) {
      throw new Error(`Selected subject not support given interaction  ${interactionId}`);
    }

    const resolver = this._interactionResolvers.get(interactionId);
    if (!resolver) {
      throw new Error(`Cannot find resolver for ${interactionId}`);
    }
    
    const result = resolver.resolveInteraction(initiator, subject, interaction);
    if (!result) {
      return;
    }
  }

}