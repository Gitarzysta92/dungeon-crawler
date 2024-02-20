import { EntityLifecycle } from "../../../base/entity/entity.constants";
import { IBoardCoordinates, IBoardField } from "../board.interface";

export class BoardField implements IBoardField {
  id: string;
  lifecycle: EntityLifecycle;
  wasUsed?: boolean;
  toRemove?: boolean;
  isEntity: true;
  isBoardField: true;
  position: IBoardCoordinates;

  constructor(data: IBoardField) {
    Object.assign(this, data);
  }

  isOccupied(): unknown {
    throw new Error("Method not implemented.");
  }
}