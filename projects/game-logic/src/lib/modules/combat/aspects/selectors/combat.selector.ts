import { IDelegateDeclaration } from "../../../../infrastructure/delegate/delegate.interface";
import { ISelectorDeclaration, ISelectorHandler} from "../../../../cross-cutting/selector/selector.interface";
import { IDamageReciver } from "../../entities/damage-reciver/damage-reciver.interface";
import { IDamageDealer } from "../../entities/damage-dealer/damage-dealer.interface";



export const COMBAT_SELECTOR = "COMBAT_SELECTOR";

export interface ICombatSelector {
  isDamageReciver: boolean
  isDamageDealer: boolean
}

export class CombatSelector implements ISelectorHandler<ICombatSelector, IDamageReciver & IDamageDealer> {
  
  public delegateId = COMBAT_SELECTOR;

  private readonly selectorProps: Array<keyof ICombatSelector> = ["isDamageReciver", "isDamageDealer"];


  public static isActorSelector(data: any): boolean {
    return data.delegateId === COMBAT_SELECTOR; 
  }
  
  public static asActorSelector<T>(data: T): T & ISelectorDeclaration<ICombatSelector> {
    if (!this.isActorSelector(data)) {
      throw new Error("Provided data is not a Damage reciver or damage dealer");
    } 
    return data as ISelectorDeclaration<ICombatSelector> & T;
  }
  

  public isApplicableTo(d: IDelegateDeclaration): boolean {
    return this.delegateId === d.delegateId;
  }

  public select(
    s: ISelectorDeclaration<ICombatSelector>,
    d: Array<IDamageReciver & IDamageDealer>
  ): Array<IDamageReciver & IDamageDealer> {
    const isValid = this._validateSelectorDeclaration(s);
    if (!isValid) {
      throw new Error("Actor selector: Provided selector declaration is invalid")
    }

    let result: Array<IDamageReciver & IDamageDealer> = d;

    if (s.payload.isDamageDealer != null) {
      result = d.filter(o => o.isDamageDealer); 
    }

    if (s.payload.isDamageReciver != null) {
      result = d.filter(o => o.isDamageReciver); 
    }

    return result;
  }

  private _validateSelectorDeclaration(d: ISelectorDeclaration<ICombatSelector>): boolean {
    for (let key in d.payload) {
      if (!this.selectorProps.includes(key as keyof ICombatSelector)) {
        return false;
      }
    }
    return true;
  }


}
