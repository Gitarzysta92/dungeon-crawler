import { IEntity } from "../../../../base/entity/entity.interface";
import { IModifierExposer } from "../../../../cross-cutting/modifier/modifier.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IDamageDealer } from "./damage-dealer.interface";


export class DamageDealerFactory implements IMixinFactory<IDamageDealer>  {

  constructor() { }

  public static isDamageDealer(e: any): boolean {
    return e.isDamageDealer;
  }
  
  public static asDamageDealer<T>(data: T): T & IDamageDealer {
    if (!this.isDamageDealer(data)) {
      throw new Error("Provided data is not a DamageDealer");
    } 
    return data as T & IDamageDealer
  }

  public isApplicable(e: IDamageDealer): boolean {
    return e.isDamageDealer;
  };


  public create(bc: Constructor<IEntity & IModifierExposer>): Constructor<IDamageDealer> {
    return class DamageDealer extends bc implements IDamageDealer {

      public isDamageDealer = true as const;
    
      constructor(e: IDamageDealer) {
        super(e);
      }

      public calculateDamage(d: number, t: any): number {
        return d;
      }

    }
  };
}