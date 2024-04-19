import { EntityService } from "../../../lib/base/entity/entity.service";
import { HeroClassFactory } from "./entities/hero-class/hero-class.factory";
import { HeroOriginFactory } from "./entities/hero-origin/hero-origin.factory";
import { HeroRaceFactory } from "./entities/hero-race/hero-race.factory";
import { HeroFactory } from "./entities/hero/hero.factory";

export class HeroModule {
  constructor(
    private readonly _entityService: EntityService
  ) { }
  
  public initialize() {
    this._entityService.useFactories([
      new HeroFactory(),
      new HeroClassFactory(),
      new HeroOriginFactory(),
      new HeroRaceFactory()
    ])
    return {};
  }
}