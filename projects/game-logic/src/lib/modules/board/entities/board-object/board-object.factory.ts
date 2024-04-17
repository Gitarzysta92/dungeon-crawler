import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { Constructor } from "../../../../extensions/types";
import { IBoardCoordinates, IBoardObjectRotation } from "../../board.interface";
import { CoordsHelper } from "../../helpers/coords.helper";
import { Side } from "./board-object.constants";
import { IBoardAssignment, IBoardObject, IBoardObjectDeclaration } from "./board-object.interface";

export class BoardObjectFactory implements IMixinFactory<IBoardObject> {

  constructor( ) { }

  public validate(e: IEntityDeclaration & Partial<IBoardObjectDeclaration>): boolean {
    return e.isBoardObject;
  };

  public create(e: Constructor<IEntity>): Constructor<IBoardObject> {
    return class BoardObject extends e implements IBoardObject, Partial<IBoardAssignment> {
      isBoardObject = true as const;
      outlets: Side[];
      size: number;
      rotation: IBoardObjectRotation;
      position: IBoardCoordinates;
      
      constructor(d: IBoardObjectDeclaration & Partial<IBoardAssignment>) {
        super(d);
        this.outlets = d.outlets;
        this.size = d.size;
        this.rotation = d.rotation;
        this.position = d.position;
      }

      public assign(s: IBoardAssignment): void {
        this.position = s.position;
        this.rotation = s.rotation;
      }

      public unassign(): void {
        throw new Error("Method not implemented.");
      }

      public isAssigned(c: IBoardCoordinates): boolean {
        return CoordsHelper.isCoordsEqual(c, this.position);
      }

    }
  };
}