
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { ICubeCoordinates } from "../../board.interface";
import { IBoardObject } from "../board-object/board-object.interface";

export interface IBoardField extends Omit<IBoardFieldDeclaration, 'entities'>, IEntity { 
  isOccupied(o?: IBoardObject): boolean;
  getOccupier<T extends IBoardObject>(): T
}

export interface IBoardFieldDeclaration extends IEntityDeclaration {
  position: ICubeCoordinates;
  isBoardField: true;
}