import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { Constructor } from "../../../../extensions/types";
import { ICubeCoordinates } from "../../board.interface";
import { BoardService } from "../../board.service";
import { IBoardField, IBoardFieldDeclaration } from "./board-field.interface";

export class BoardFieldFactory implements IMixinFactory<IBoardField> {

  constructor(
    private readonly _boardService: BoardService
  ) { }
  
  public validate(e: IEntityDeclaration & Partial<IBoardField>): boolean {
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
    
      isOccupied(): boolean {
        return !!boardService.getObjectByPosition(this.position);
      }
    }
    return BoardField;
  };
}