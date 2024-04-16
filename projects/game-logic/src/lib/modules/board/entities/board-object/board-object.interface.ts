import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IBoardObjectRotation, IBoardCoordinates } from "../../board.interface";
import { Side } from "./board-object.constants";


export interface IBoardAssignment {
  rotation: IBoardObjectRotation;
  position: IBoardCoordinates;
}

export interface IBoardObject extends IBoardObjectDeclaration {
  assign(s: IBoardAssignment): void;
  unassign(): void;
  isAssigned(c: IBoardCoordinates): boolean;
}

export interface IBoardObjectDeclaration extends IEntityDeclaration {
  outlets: Side[];
  size: number;
  isBoardObject: true;
}