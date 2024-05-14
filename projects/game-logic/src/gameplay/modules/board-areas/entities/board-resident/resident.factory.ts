
import { IEntity } from "../../../../../lib/base/entity/entity.interface";
import { IMixinFactory } from "../../../../../lib/base/mixin/mixin.interface";
import { Constructor, Guid } from "../../../../../lib/extensions/types";
import { IBoardObject } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IBoardAreaResident, IBoardAreaResidentDeclaration } from "./resident.interface";

export class BoardAreaResidentFactory implements IMixinFactory<IBoardAreaResident> {

  constructor() { }
    
  public validate(e: IBoardAreaResident): boolean {
    return e.isResident && e.isBoardObject;
  };

  public create(e: Constructor<IEntity & IBoardObject>): Constructor<IBoardAreaResident> {
    return class Resident extends e implements IBoardAreaResident {
      
      isResident = true as const;
      occupiedAreaId: Guid;

      constructor(d: IBoardAreaResidentDeclaration) {
        super(d);
        this.occupiedAreaId = d.occupiedAreaId;
      }
    }
  };
}