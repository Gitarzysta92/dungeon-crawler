import { IEntityFactory, IEntity } from "../../../base/entity/entity.interface";
import { IBoardObject } from "../board.interface";
import { BoardObject } from "./board-object";

export class BoardObjectFactory implements IEntityFactory<BoardObject> {

  public get classDefinition() { return BoardObject };

  constructor( ) { }
  
  public create(e: IBoardObject): BoardObject {
    return new BoardObject(e);
  };

  public validate(e: IEntity & Partial<IBoardObject>): boolean {
    return e.isBoardObject;
  };

}