import { IBoardGridCoordinates } from "../aspects/coordinate-system/base/coordinate-system";

export abstract class Field {

  public abstract coordinates: IBoardGridCoordinates;
  public abstract neighbours: Field[];
  public isVisited: boolean = false;

  constructor(
    public index: number,
    public columnIndex: number,
    public rowIndex: number,
  ) { }

  public isEqual(f: Field): boolean {
    return this.index === f.index && this.columnIndex === f.columnIndex && this.rowIndex === f.rowIndex;
  }

}