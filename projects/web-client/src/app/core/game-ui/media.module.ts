import { EntityService } from "@game-logic/lib/base/entity/entity.service";
import { NarrativeMediumFactory } from "./mixins/narrative-medium/narrative-medium.factory";
import { UiVisualMediumFactory } from "./mixins/visual-medium/ui-medium.factory";

export class UiModule {
  constructor(
    private readonly _entityService: EntityService,
  ) { }
  
  public initialize() {
    this._entityService.useFactories([
      new NarrativeMediumFactory(),
      new UiVisualMediumFactory()
    ]);
    return {};
  }
}