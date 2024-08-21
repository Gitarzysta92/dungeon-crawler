import { IDelegateDeclaration } from "../../../../infrastructure/delegate/delegate.interface";
import { ISelectorDeclaration, ISelectorHandler} from "../../../../cross-cutting/selector/selector.interface";
import { IDeckBearer } from "../../entities/deck-bearer/deck-bearer.interface";


export const DECK_BEARER_SELECTOR = "DECK_BEARER_SELECTOR";

export interface IDeckBearerSelector{
  notInGroupId?: string;
  inGroupId?: string;
  isCreature?: boolean
}

export class ActorSelector implements ISelectorHandler<IDeckBearerSelector, IDeckBearer> {
  
  public delegateId = DECK_BEARER_SELECTOR;


  public static isActorSelector(data: any): boolean {
    return data.delegateId === DECK_BEARER_SELECTOR; 
  }
  
  public static asActorSelector<T>(data: T): T & ISelectorDeclaration<IDeckBearerSelector> {
    if (!this.isActorSelector(data)) {
      throw new Error("Provided data is not a Procedure");
    } 
    return data as ISelectorDeclaration<IDeckBearerSelector> & T;
  }
  

  public isApplicableTo(d: IDelegateDeclaration): boolean {
    return this.delegateId === d.delegateId;
  }

  public select(
    s: ISelectorDeclaration<IDeckBearerSelector>,
    d: IDeckBearer[]
  ): IDeckBearer[] {
    let result: IDeckBearer[] = d.filter(o => o.isDeckBearer);
    return result;
  }


}
