import { ISelectorDeclaration, ISelectorHandler} from "../../../../cross-cutting/selector/selector.interface";
import { Actor } from "../../entities/actor/actor";

export const ACTOR_SELECTOR = "ACTOR_SELECTOR";

export interface IActorSelectorPayload {
  selectorTargets?: 'single' | 'multiple' | 'all' | 'caster';
  amountOfTargets?: number;
  requireUniqueTargets?: boolean;
}

export class ActorSelector implements ISelectorHandler<IActorSelectorPayload, Actor> {

  delegateId = ACTOR_SELECTOR;

  select: (s: ISelectorDeclaration<IActorSelectorPayload>, d: unknown[]) => Actor[];
  isApplicableTo: (d: ISelectorDeclaration<IActorSelectorPayload>) => boolean;
  prepare: (ctx: unknown, d: IActorSelectorPayload) => IActorSelectorPayload;

}
