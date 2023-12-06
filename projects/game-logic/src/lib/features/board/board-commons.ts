import { IBoardObject } from "./board.interface";

export function validateBoardObject<T extends Object>(o: T): T & IBoardObject | undefined {
  let isBoardObject = true
  if (!(o as T & IBoardObject)?.position) {
    isBoardObject = false;
  }
  if (!(o as T & IBoardObject)?.rotation == null) {
    isBoardObject = false;
  }
  return isBoardObject ? o as T & IBoardObject : undefined;
}