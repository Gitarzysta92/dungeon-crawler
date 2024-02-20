
import { EntityLifecycle } from "../../../base/entity/entity.constants";
import { Side } from "../board.constants";
import { IBoardAssignment, IBoardCoordinates, IBoardField, IBoardObject, IBoardObjectRotation } from "../board.interface";
import { IPathSegment } from "../pathfinding/pathfinding.interface";

export class BoardObject implements IBoardObject, Partial<IBoardAssignment> {
  lifecycle: EntityLifecycle;
  wasUsed?: boolean;
  toRemove?: boolean;
  isEntity: true;
  public id: string;
  public outlets: Side[];
  public size: number;
  public isBoardObject: true;

  public rotation?: IBoardObjectRotation;
  public position?: IBoardCoordinates;

  constructor(data: IBoardObject & Partial<IBoardAssignment>) {
    Object.assign(this, data);
  }

  public isAdjacentTo(): void { };

  public assign(segment: IPathSegment | IBoardField) {
    throw new Error("Method not implemented.");
  }

  public unassign() {
    throw new Error("Method not implemented.");
  }
}


// public assignObject<T extends IBoardObject & O>(object: T, field: IField, rotation: IBoardObjectRotation): void {
//   const boardField = this.fieldDeclarations[CoordsHelper.createKeyFromCoordinates(field.position)];
  
//   if (boardField.isOccupied()) {
//     throw new Error("Cannot assign object to given field, because it is occupied")
//   }

//   this.objects[CoordsHelper.createKeyFromCoordinates(field.position)] = Object.assign(object, {
//     position: field.position,
//     rotation: rotation,
//   });
// }

// public unassignObject(object: IAassignedBoardObject) {
//   if (!object.position) {
//     throw new Error("Object is already unassigned from the board")
//   }
//   delete this.objects[CoordsHelper.createKeyFromCoordinates(object.position)];
//   delete (object as Partial<IAassignedBoardObject>).position;
// }