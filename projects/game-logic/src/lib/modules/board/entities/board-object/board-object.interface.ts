import { IEntity } from "../../../../base/entity/entity.interface";
import { IBoardObjectRotation, IBoardCoordinates } from "../../board.interface";
import { IBoardField } from "../board-field/board-field.interface";
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

export interface IBoardObjectDeclaration extends IEntity {
  outlets: Side[];
  size: number;
  isBoardObject: true;
}