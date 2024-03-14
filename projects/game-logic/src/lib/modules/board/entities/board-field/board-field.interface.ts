import { IEntity } from "../../../../base/entity/entity.interface";
import { IBoardCoordinates } from "../../board.interface";

export interface IBoardField extends IBoardFieldDeclaration { 
  isOccupied(): boolean;
}

export interface IBoardFieldDeclaration extends IEntity {
  position: IBoardCoordinates;
  isBoardField: true;
}