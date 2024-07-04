import { IDelegateDeclaration } from "../../../../infrastructure/delegate/delegate.interface";
import { ISelectorDeclaration, ISelectorHandler} from "../../../../cross-cutting/selector/selector.interface";
import { IActor } from "../../entities/actor/actor.interface";


export const ACTOR_SELECTOR = "ACTOR_SELECTOR";

export interface IActorSelectorPayload {
  selectorTargets?: 'single' | 'multiple' | 'all' | 'caster';
  amountOfTargets?: number;
}

export class ActorSelector implements ISelectorHandler<IActorSelectorPayload, IActor> {
  
  public delegateId = ACTOR_SELECTOR;

  public isApplicableTo(d: IDelegateDeclaration): boolean {
    return this.delegateId === d.delegateId;
  }

  public select(s: ISelectorDeclaration<IActorSelectorPayload>, d: IActor[]): IActor[] {
    return [];
  }


}
