import { Constructor } from "../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { IPawn, IPawnDeclaration } from "./pawn.interface";



export class PawnFactory implements IMixinFactory<IPawn>  {

  public isApplicable(e: IPawn): boolean {
    return e.isPawn;
  };
  
  public create(e: Constructor<IMixin & IPawn>): Constructor<IPawn> { 
    return class Pawn extends e implements IPawn {
      playerId: string;
      isPawn = true as const;
    
      constructor(data: IPawnDeclaration) {
        super(data);
        this.playerId = data.playerId;
      }

      public isAdjanced(e: IPawn): boolean {
        return false;
      }    
    };
  }
}