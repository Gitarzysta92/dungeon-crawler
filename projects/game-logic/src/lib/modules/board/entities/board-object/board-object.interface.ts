import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IBoardObjectRotation, ICubeCoordinates } from "../../board.interface";
import { Side } from "./board-object.constants";


export interface IBoardAssignment {
  rotation: IBoardObjectRotation;
  position: ICubeCoordinates;
}

export interface IBoardObject extends IBoardObjectDeclaration {
  assign(s: IBoardAssignment): void;
  unassign(): void;
  isAssigned(c: ICubeCoordinates): boolean;
}

export interface IBoardObjectDeclaration extends IEntityDeclaration {
  outlets: Side[];
  size: number;
  isBoardObject: true;
}