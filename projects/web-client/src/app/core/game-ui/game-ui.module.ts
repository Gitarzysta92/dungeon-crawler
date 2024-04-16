import { EntityService } from "@game-logic/lib/base/entity/entity.service";
import { NarrativeMediumFactory } from "./entities/narrative-medium/narrative-medium.factory";
import { VisualMediumFactory } from "./entities/visual-medium/visual-medium.factory";

export class GameUiModule {
  constructor(
    private readonly _entityService: EntityService,
  ) { }
  
  public initialize() {
    this._entityService.useFactories([
      new NarrativeMediumFactory(),
      new VisualMediumFactory()
    ]);
    return {};
  }
}