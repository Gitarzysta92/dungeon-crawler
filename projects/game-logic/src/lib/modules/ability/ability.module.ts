import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { AbilityFactory } from "./ability.factory";
import { IAbilityDataFeed } from "./ability.interface";
import { AbilityPerformerFactory } from "./performer/ability-performer.factory";

export class AbilityModule {
  constructor(
    private readonly _dataFeed: IAbilityDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _modifierService: ModifierService,
    private readonly _selectorService: SelectorService
  ) { }
  
  public initialize(): void {
    this._entityService.useFactories([
      new AbilityFactory(this._dataFeed, this._modifierService),
      new AbilityPerformerFactory(this._dataFeed),
    ]);
  }
}