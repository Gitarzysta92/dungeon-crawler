import { IEntityFactory, IEntity } from "../../../base/entity/entity.interface";
import { IBoardField } from "../board.interface";
import { BoardField } from "./board-field";

export class BoardFieldFactory implements IEntityFactory<BoardField> {

  public get classDefinition() { return BoardField };

  constructor( ) { }
  
  public create(e: IBoardField): BoardField {
    return new BoardField(e);
  };

  public validate(e: IEntity & Partial<IBoardField>): boolean {
    return e.isBoardField;
  };

}