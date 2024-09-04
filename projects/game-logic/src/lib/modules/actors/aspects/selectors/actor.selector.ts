import { IDelegateDeclaration } from "../../../../infrastructure/delegate/delegate.interface";
import { ISelectorDeclaration, ISelectorHandler} from "../../../../cross-cutting/selector/selector.interface";
import { IActor } from "../../entities/actor/actor.interface";


export const ACTOR_SELECTOR = "ACTOR_SELECTOR";

export interface IActorSelector {
  notInGroupId?: string;
  inGroupId?: string;
  isCreature?: boolean
}

export class ActorSelector implements ISelectorHandler<IActorSelector, IActor> {
  
  public delegateId = ACTOR_SELECTOR;

  private readonly selectorProps: Array<keyof IActorSelector> = ["inGroupId", "isCreature", "notInGroupId"];


  public static isActorSelector(data: any): boolean {
    return data.delegateId === ACTOR_SELECTOR; 
  }
  
  public static asActorSelector<T>(data: T): T & ISelectorDeclaration<IActorSelector> {
    if (!this.isActorSelector(data)) {
      throw new Error("Provided data is not a Procedure");
    } 
    return data as ISelectorDeclaration<IActorSelector> & T;
  }
  

  public isApplicableTo(d: IDelegateDeclaration): boolean {
    return this.delegateId === d.delegateId;
  }

  public select(
    s: ISelectorDeclaration<IActorSelector>,
    d: IActor[]
  ): IActor[] {
    const isValid = this._validateSelectorDeclaration(s);
    if (!isValid) {
      throw new Error("Actor selector: Provided selector declaration is invalid")
    }

    let result: IActor[] = d.filter(o => o.isActor);

    if (s.payload.notInGroupId != null) {
      result = d.filter(o => o.groupId !== s.payload.notInGroupId); 
    }
    
    if (s.payload.inGroupId != null) {
      result = d.filter(o => o.groupId === s.payload.inGroupId); 
    }

    if ('isCreature' in s.payload) {
      result = d.filter(o => o.isCreature === s.payload.isCreature)
    }

    return result;
  }

  private _validateSelectorDeclaration(d: ISelectorDeclaration<IActorSelector>): boolean {
    for (let key in d.payload) {
      if (!this.selectorProps.includes(key as keyof IActorSelector)) {
        return false;
      }
    }
    return true;
  }


}
