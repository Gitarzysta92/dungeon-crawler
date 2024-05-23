
import { NarrativeMediumFactory } from "./mixins/narrative-medium/narrative-medium.factory";
import { UiVisualMediumFactory } from "./mixins/ui-medium/ui-medium.factory";
import { InteractableMediumFactory } from "./mixins/interactable-medium/interactable-medium.factory";
import { EntityService } from "@game-logic/lib/base/entity/entity.service";

export class UiModule {
  constructor(
    private readonly _entityService: EntityService,
  ) { }
  
  public initialize() {
    this._entityService.useFactories([
      new NarrativeMediumFactory(),
      new UiVisualMediumFactory(),
      new InteractableMediumFactory()
    ]);
    return {};
  }
}