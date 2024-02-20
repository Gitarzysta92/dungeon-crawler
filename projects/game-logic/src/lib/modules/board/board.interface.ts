import { IEntity } from "../../base/entity/entity.interface";
import { Side } from "./board.constants";

export interface IBoardField extends IEntity {
  position: IBoardCoordinates;
  isBoardField: true;
}

export interface IBoardObject extends IEntity {
  id: string;
  outlets: Side[];
  size: number;
  isBoardObject: true;
}

export interface IBoardAssignment {
  rotation: IBoardObjectRotation;
  position: IBoardCoordinates;
}

export type IAassignedBoardObject = IBoardObject & IBoardAssignment;

export type IBoardCoordinates = {
  r: number, q: number, s: number 
};
export type IBoardObjectRotation = 0 | 1 | 2 | 3 | 4 | 5;

// isEqual(coords: IBoardCoordinates): boolean; 