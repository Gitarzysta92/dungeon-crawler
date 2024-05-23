
import { ActionService } from "../../cross-cutting/action/action.service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { AbilityFactory } from "./entities/ability/ability.factory";
import { IAbilitiesDataFeed } from "./abilities.interface";
import { AbilityPerformerFactory } from "./entities/performer/ability-performer.factory";
import { AbilitiesService } from "./abilities.service";
import { AbilityModifierHandler } from "./aspects/modifiers/ability.modifier";
import { AddAbilityAction } from "./aspects/actions/add-ability.action";
import { RemoveAbilityAction } from "./aspects/actions/remove-ability.action";
import { EntityService } from "../../base/entity/entity.service";

export class AbilityModule {
  constructor(
    private readonly _dataFeed: IAbilitiesDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _modifierService: ModifierService,
    private readonly _selectorService: SelectorService
  ) { }
  
  public initialize() {
    const abilitiesService = new AbilitiesService(this._entityService, this._dataFeed);

    this._entityService.useFactories([
      new AbilityFactory(this._dataFeed, this._modifierService),
      new AbilityPerformerFactory(),
    ]);

    this._actionService.register(new AddAbilityAction(abilitiesService));
    this._actionService.register(new RemoveAbilityAction());

    this._modifierService.register(new AbilityModifierHandler());

    return {
      abilitiesService
    }
  }
}