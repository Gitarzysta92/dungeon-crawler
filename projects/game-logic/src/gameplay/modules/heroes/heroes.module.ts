import { EntityService } from "../../../lib/base/entity/entity.service";
import { HeroFactory } from "./entities/hero/hero.factory";

export class HeroModule {
  constructor(
    private readonly _entityService: EntityService
  ) { }
  
  public initialize() {
    this._entityService.useFactories([new HeroFactory()])
    return {};
  }
}