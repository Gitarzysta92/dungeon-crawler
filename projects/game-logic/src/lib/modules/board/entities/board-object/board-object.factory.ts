
import { IEntityDeclaration, IEntity } from "../../../../base/entity/entity.interface";
import { IPawn } from "../../../../base/pawn/pawn.interface";
import { ISelectorDeclaration } from "../../../../cross-cutting/selector/selector.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IBoardObjectRotation, ICubeCoordinates } from "../../board.interface";
import { CubeCoordsHelper } from "../../helpers/coords.helper";
import { RotationHelper } from "../../helpers/rotation.helper";
import { Side } from "./board-object.constants";
import { IBoardAssignment, IBoardObject, IBoardObjectDeclaration } from "./board-object.interface";

export class BoardObjectFactory implements IMixinFactory<IBoardObject> {

  constructor() { }
  
  public static isBoardObject(data: any): boolean {
    return data.isBoardObject; 
  }
  
  public static asBoardObject<T>(data: T): T & IBoardObject {
    if (!this.isBoardObject(data)) {
      throw new Error("Provided data is not a Board Object");
    } 
    return data as IBoardObject & T;
  }

  public isApplicable(e: IEntityDeclaration & Partial<IBoardObjectDeclaration>): boolean {
    return e.isBoardObject;
  };

  public create(e: Constructor<IEntity & IPawn>): Constructor<IBoardObject> {
    return class BoardObject extends e implements IBoardObject, Partial<IBoardAssignment> {
      isBoardObject = true as const;
      outlets: Side[];
      size: number;
      rotation: IBoardObjectRotation;
      position: ICubeCoordinates;

      public get actualOutlets() { return RotationHelper.calculateActualSides(this.outlets, this.rotation) }
      
      constructor(d: IBoardObjectDeclaration & Partial<IBoardAssignment>) {
        super(d);
        this.outlets = d.outlets;
        this.rotation = d.rotation ?? 0;
        this.position = d.position;
      }


      public isAdjanced(s: IBoardAssignment & IBoardObject): boolean {
        if (!s.position) {
          return false;
        }
        const coords = CubeCoordsHelper.getCircleOfCoordinates(this.position, 1);
        return coords.some(c => CubeCoordsHelper.isCoordsEqual(c, s.position)) || super.isAdjanced(s);
      }

      public assign(s: IBoardAssignment): void {
        this.position = s.position;
        this.rotation = s.rotation;
      }

      public unassign(): void {
        this.position = undefined;
        this.position = undefined;
      }

      public isAssigned(c: ICubeCoordinates): boolean {
        return CubeCoordsHelper.isCoordsEqual(c, this.position);
      }

    }
  };
}