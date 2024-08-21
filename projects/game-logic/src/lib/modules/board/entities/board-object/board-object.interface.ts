import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IBoardObjectRotation, ICubeCoordinates } from "../../board.interface";
import { Side } from "./board-object.constants";


export interface IBoardAssignment {
  rotation: IBoardObjectRotation;
  position: ICubeCoordinates;
}

export interface IBoardObject extends Omit<IBoardObjectDeclaration, 'entities'>, IEntity, Partial<IBoardAssignment> {
  actualOutlets: Side[];
  assign(s: IBoardAssignment): void;
  unassign(): void;
  isAssigned(c: ICubeCoordinates): boolean;
  isAdjanced(s: { position: ICubeCoordinates } & IEntity)
}

export interface IBoardObjectDeclaration extends IEntityDeclaration {
  outlets: Side[];
  isBoardObject: true;
}