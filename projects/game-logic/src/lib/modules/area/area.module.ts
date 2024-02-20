import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { AreaObjectFactory } from "./area-object/area-object.factory";
import { IAreaDataFeed } from "./area.interface";


export class AreaModule {
  constructor(
    private readonly _dataFeed: IAreaDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _modifierService: ModifierService,
    private readonly _selectorService: SelectorService
  ) { }
  
  public initialize(): void {
    this._entityService.useFactories([
      new AreaObjectFactory(this._dataFeed),
    ]);
  }
}