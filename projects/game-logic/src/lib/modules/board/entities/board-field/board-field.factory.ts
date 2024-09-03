
import { IEntityDeclaration, IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ICubeCoordinates } from "../../board.interface";
import { BoardService } from "../../board.service";
import { IBoardObject } from "../board-object/board-object.interface";
import { IBoardField, IBoardFieldDeclaration } from "./board-field.interface";

export class BoardFieldFactory implements IMixinFactory<IBoardField> {

  constructor(
    private readonly _boardService: BoardService
  ) { }

  public static isBoardField(data: any): boolean {
    return data.isBoardField; 
  }
  
  public static asBoardField<T>(data: T): T & IBoardField {
    if (!this.isBoardField(data)) {
      throw new Error("Provided data is not a Board Object");
    } 
    return data as IBoardField & T;
  }
  
  public isApplicable(e: IEntityDeclaration & Partial<IBoardField>): boolean {
    return e.isBoardField;
  };
  
  public create(e: Constructor<IEntity>): Constructor<IBoardField> {
    const boardService = this._boardService
    class BoardField extends e implements IBoardField {
      isBoardField = true as const;
      position: ICubeCoordinates;

      constructor(d: IBoardFieldDeclaration) {
        super(d);
        this.position = d.position;
      }
    
      public isOccupied(o?: IBoardObject): boolean {
        if (o) {
          return o === boardService.getObjectByPosition(this.position);
        } else {
          return !!boardService.getObjectByPosition(this.position);
        }
      }

      public getOccupier<T extends IBoardObject>(): T {
        return boardService.getObjectByPosition(this.position) as T
      } 
    }
    return BoardField;
  };
}