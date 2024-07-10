import { IGatherableDataProvider } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { ISelectorDeclaration } from "../../../../cross-cutting/selector/selector.interface";
import { SelectorService } from "../../../../cross-cutting/selector/selector.service";
import { IBoardField } from "../../../board/entities/board-field/board-field.interface";
import { ACTOR_DATA_TYPE } from "../../actors.constants";

export class ActorDataProvider implements IGatherableDataProvider {

  constructor(
    private readonly _selectorService: SelectorService
  ) { }

  validate(dataType: string): boolean {
    return ACTOR_DATA_TYPE === dataType
  }

  public getData(s: ISelectorDeclaration<unknown>[]): IBoardField[] {
    return []
  }
}
