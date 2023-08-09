import { IDictionary } from "../../extensions/types";
import { IBoardCoordinates, IBoardObject, IBoardSelector, IField, IBoard } from "./board.interface";

export class Board implements IBoard {


  fields: IDictionary<IField>;
  objects: IBoardObject[];

  constructor(data: IBoard) {
    this.fields = data.fields;
    this.objects = data.objects;
  }

  public getActorPositionById(id: string): IBoardCoordinates {
    return {} as IBoardCoordinates
  }

  public moveObject(actorId: string, coords: IBoardCoordinates) {

  }

  public createObject(actorId: string, coords: IBoardCoordinates) {

  }

  public removeObject(a: IBoardObject) {
    
  }

  public getSelectedObjects(selector: IBoardSelector, coords?: IBoardCoordinates[]): IBoardObject[] {


    switch (selector.selectorType) {
      case "line":
        break;
      
      case "cone":
        break;
      
      case "radius":
        break;
      
    
      default:
        break;
    }


    if (selector.selectorType = "cone") {

    } 

    if (selector.selectorOrigin) {

    }

    return [];
  }

  public getSelectedFields(action: IBoardSelector): IBoardObject[] {
    return [];
  }


  // public initialize(size: number): IBoard {
  //   const coords = this._coordsHelper.createHexagonalBoardCoords(size);
  //   return {
  //     coords: coords,
  //     fields: Object.fromEntries(coords.map(c => [this._getFieldKey(c), {} as Field]))
  //   }
  // }

  // public assingdTile(tile: Tile, coord: ICoords, board: IBoard): IBoard {
  //   if (this.isFieldOccupied(coord, board)) {
  //     throw new Error(`Cannot assing to field: ${JSON.stringify(coord)}. Field is already occupied.`)
  //   }
  //   board.fields[this._getFieldKey(coord)].tile = tile;
  //   return board;
  // }

  // public removeTile(coord: ICoords, board: IBoard): IBoard {
  //   if (board.fields[this._getFieldKey(coord)]?.tile) {
  //     board.fields[this._getFieldKey(coord)].tile = null;
  //   }
  //   return board;
  // }

  // public getFields(coords: ICoords[], board: IBoard): Field[] {
  //   return coords.map(c => board.fields[this._getFieldKey(c)])
  //     .filter(f => !!f);
  // }

  // public isFieldOccupied(coord: ICoords, board: IBoard): boolean {
  //   return !!board.fields[this._getFieldKey(coord)]?.tile
  // }


  // private _getFieldKey(coord: ICoords): string {
  //   return `${coord.q}${coord.r}${coord.s}`
  
}