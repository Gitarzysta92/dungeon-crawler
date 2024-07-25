
import { IEntity } from "../../../../../lib/base/entity/entity.interface";
import { Constructor, Guid } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory } from "../../../../../lib/infrastructure/mixin/mixin.interface";
import { IBoardObject } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IBoardAreaResident, IBoardAreaResidentDeclaration } from "./resident.interface";

export class BoardAreaResidentFactory implements IMixinFactory<IBoardAreaResident> {

  constructor() { }
    
  public isApplicable(e: IBoardAreaResident): boolean {
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