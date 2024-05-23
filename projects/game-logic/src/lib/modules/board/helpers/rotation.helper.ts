import { IBoardObjectRotation } from "../board.interface";
import { Side } from "../entities/board-object/board-object.constants";

export class RotationHelper {

  public static readonly possibleDirections = Object.keys(Side).length / 2;

  public static calculateRotation(rotation: number, initialRotation: IBoardObjectRotation): IBoardObjectRotation {
    if (rotation === 0) {
      return initialRotation;
    }
    const x = (initialRotation + rotation) % RotationHelper.possibleDirections;
    if (x < 0) {
      return  RotationHelper.possibleDirections + x as IBoardObjectRotation
    } else {
      return x as IBoardObjectRotation;
    }
  }

  public static calculateActualSides(outlets: Side[], rotation: IBoardObjectRotation): Side[] {
    return outlets.map(o => Side[Side[(RotationHelper.calculateRotation(rotation, o))] as keyof typeof Side]);
  }

  public static validateSideValue(side: IBoardObjectRotation): void {
    if (side == null || side > RotationHelper.possibleDirections - 1) {
      throw new Error(`Hex side out of range: 0-5. Current value ${side}`)
    }
  }
}
