import { IBoardObjectRotation } from "./board.interface";

export class RotationHelper {
  public static calculateRotation(rotation: number, initialRotation: IBoardObjectRotation): IBoardObjectRotation {
    if (rotation === 0) {
      return initialRotation;
    }
    
    const possibleDirections = 6;
    const x = (initialRotation + rotation) % possibleDirections;
    if (x < 0) {
      return possibleDirections + x as IBoardObjectRotation
    } else {
      return x as IBoardObjectRotation;
    }
  }
}
