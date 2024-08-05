import { IGatherableDataProvider } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { ISelectorDeclaration } from "../../../../cross-cutting/selector/selector.interface";
import { SelectorService } from "../../../../cross-cutting/selector/selector.service";
import { ACTOR_DATA_TYPE } from "../../actors.constants";
import { ActorsService } from "../../actors.service";
import { IActor } from "../../entities/actor/actor.interface";

export class ActorDataProvider implements IGatherableDataProvider {

  constructor(
    private readonly _selectorService: SelectorService,
    private readonly _actorsService: ActorsService
  ) { }

  validate(dataType: string): boolean {
    return ACTOR_DATA_TYPE === dataType
  }

  public getData(s: ISelectorDeclaration<unknown>[]): IActor[] {
    const data = this._actorsService.getAllActors();
    return this._selectorService.process2(s, data);
  }
}
