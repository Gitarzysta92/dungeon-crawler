import { IBoardSelector, IAassignedBoardObject } from "./board.interface";

export class BoardHelper {
  
  public static validateSelector<T extends Object>(o: T): T & IBoardSelector | undefined {
    let isSelector = true
    if (!(o as T & IBoardSelector)?.selectorType) {
      isSelector = false;
    }
    return isSelector ? o as T & IBoardSelector : undefined;
  }

  public static validateBoardObject<T extends Object>(o: T): T & IAassignedBoardObject | undefined {
    let isBoardObject = true
    if (!(o as T & IAassignedBoardObject)?.position) {
      isBoardObject = false;
    }
    if (!(o as T & IAassignedBoardObject)?.rotation == null) {
      isBoardObject = false;
    }
    return isBoardObject ? o as T & IAassignedBoardObject : undefined;
  }


  public static validateSelectorOriginAgainstBoardSelector(
    origin: Partial<IAassignedBoardObject>,
    selector: Omit<IBoardSelector, 'selectorOriginDeterminant'>
  ): { valid: boolean, errorMessage?: string } {
    const hasNotDeclaredPosition = (
      selector.selectorType === 'cone' ||
      selector.selectorType === 'line' ||
      selector.selectorType === 'radius'
    ) && !origin.position;
    if (hasNotDeclaredPosition) {
      return {
        valid: false,
        errorMessage: "LINE, CONE and RADIUS selector must have provided position"
      }
    }

    const hasNotDeclaredOutlets = (
      selector.selectorType === 'cone' ||
      selector.selectorType === 'line'
    ) && !Array.isArray(origin.outlets);
    if (hasNotDeclaredOutlets) {
      return {
        valid: false,
        errorMessage: "LINE and CONE selector must have provided position"
      }
    }

    return { valid: true }
  }
  
}