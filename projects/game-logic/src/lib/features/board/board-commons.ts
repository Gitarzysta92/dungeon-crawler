import { IAassignedBoardObject } from "./board.interface";

export function validateBoardObject<T extends Object>(o: T): T & IAassignedBoardObject | undefined {
  let isBoardObject = true
  if (!(o as T & IAassignedBoardObject)?.position) {
    isBoardObject = false;
  }
  if (!(o as T & IAassignedBoardObject)?.rotation == null) {
    isBoardObject = false;
  }
  return isBoardObject ? o as T & IAassignedBoardObject : undefined;
}