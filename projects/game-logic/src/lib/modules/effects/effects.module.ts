import { EntityService } from "../../base/entity/entity.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { AffectableFactory } from "../statuses/entities/affectable/affectable.factory";
import { EffectSelector } from "./aspects/selectors/effect.selector";
import { EffectFactory } from "./entities/effect.factory";
import { EffectService } from "./effects.service";

export class EffectsModule {
  constructor(
    private readonly _entityService: EntityService,

    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService,
  ) { }
  
  public initialize() {
    const effectService = new EffectService(
      this._entityService,
      this._actionService,
    );

    this._entityService.useFactories([
      new AffectableFactory(),
      new EffectFactory(effectService, this._gathererService)
    ])

    this._selectorService.register(new EffectSelector());

    return { effectService }
  }
}