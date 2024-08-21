
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { ICubeCoordinates } from "../../board.interface";

export interface IBoardField extends Omit<IBoardFieldDeclaration, 'entities'>, IEntity { 
  isOccupied(): boolean;
}

export interface IBoardFieldDeclaration extends IEntityDeclaration {
  position: ICubeCoordinates;
  isBoardField: true;
}