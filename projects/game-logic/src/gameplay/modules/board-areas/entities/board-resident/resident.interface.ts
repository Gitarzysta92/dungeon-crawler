
import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { Guid } from "../../../../../lib/infrastructure/extensions/types";
import { IBoardObject, IBoardObjectDeclaration } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";


export interface IBoardAreaResident extends IBoardAreaResidentDeclaration, IBoardObject {
  occupiedAreaId: Guid;
}


export interface IBoardAreaResidentDeclaration extends IEntityDeclaration, IBoardObjectDeclaration {
  occupiedAreaId: Guid;
  isResident: true;
}