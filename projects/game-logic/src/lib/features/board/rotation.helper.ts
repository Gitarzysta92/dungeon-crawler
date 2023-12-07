import { Outlet } from "../actors/actors.constants";
import { IBoardObjectRotation } from "./board.interface";

export class RotationHelper {

  public static readonly possibleDirections = Object.keys(Outlet).length / 2;

  public static calculateRotation(rotation: number, initialRotation: IBoardObjectRotation): IBoardObjectRotation {
    if (rotation === 0) {
      return initialRotation;
    }
    
    const x = (initialRotation + rotation) %  RotationHelper.possibleDirections;
    if (x < 0) {
      return  RotationHelper.possibleDirections + x as IBoardObjectRotation
    } else {
      return x as IBoardObjectRotation;
    }
  }

  public static calculateActualOutlets(outlets: Outlet[], rotation: IBoardObjectRotation): Outlet[] {
    return outlets.map(o => Outlet[Outlet[((o + rotation) % RotationHelper.possibleDirections)] as keyof typeof Outlet]);
  }
}
