import { IGatherableDataProvider } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { ISelectorDeclaration } from "../../../../cross-cutting/selector/selector.interface";
import { ROTATION_DATA_TYPE } from "../../board.constants";
import { IBoardObjectRotation } from "../../board.interface";

export class RotationDataProvider implements IGatherableDataProvider {

  constructor() { }

  validate(dataType: string): boolean {
    return ROTATION_DATA_TYPE === dataType
  }

  public getData(_: ISelectorDeclaration<unknown>[]): any[] {
    return [0, 1, 2, 3, 4, 5];
  }
}
