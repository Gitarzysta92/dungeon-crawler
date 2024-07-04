import { IGatherableDataProvider } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { ISelectorDeclaration } from "../../../../cross-cutting/selector/selector.interface";
import { SelectorService } from "../../../../cross-cutting/selector/selector.service";
import { FIELD_DATA_TYPE, PATH_DATA_TYPE } from "../../board.constants";
import { BoardService } from "../../board.service";
import { IBoardField } from "../../entities/board-field/board-field.interface";


export class BoardFieldDataProvider implements IGatherableDataProvider {

  constructor(
    private readonly _boardService: BoardService,
    private readonly _selectorService: SelectorService
  ) { }

  validate(dataType: string): boolean {
    return FIELD_DATA_TYPE === dataType || PATH_DATA_TYPE === dataType;
  }

  public getData(s: ISelectorDeclaration<unknown>[]): IBoardField[] {
    const data = this._boardService.getFields();
    return this._selectorService.process2<IBoardField>(s, data);
  }
}
