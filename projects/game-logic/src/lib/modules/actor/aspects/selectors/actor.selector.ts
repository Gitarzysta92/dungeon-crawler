import { IDelegateDeclaration } from "../../../../base/delegate/delegate.interface";
import { ISelectorHandler, ISelectorDefaultPayload } from "../../../../cross-cutting/selector/selector.interface";
import { Actor } from "../../actor";

export const ACTOR_SELECTOR_IDENTIFIER = "ACTOR_SELECTOR_IDENTIFIER";

export interface IActorSelectorPayload extends ISelectorDefaultPayload {
  selectorTargets?: 'single' | 'multiple' | 'all' | 'caster';
  amountOfTargets?: number;
  requireUniqueTargets?: boolean;
}

export class ActorSelector implements ISelectorHandler<IActorSelectorPayload, Actor> {

  delegateId = ACTOR_SELECTOR_IDENTIFIER;

  select: (s: ISelectorDefaultPayload, d: unknown[]) => Actor[];
  isApplicableTo: (d: IDelegateDeclaration<IActorSelectorPayload>) => boolean;
  prepare: (ctx: unknown, d: IActorSelectorPayload) => IActorSelectorPayload;

}
