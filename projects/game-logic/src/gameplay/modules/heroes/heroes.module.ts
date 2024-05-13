import { EntityService } from "../../../lib/base/entity/entity.service";
import { HeroClassFactory } from "./mixins/hero-class/hero-class.factory";
import { HeroOriginFactory } from "./mixins/hero-origin/hero-origin.factory";
import { HeroRaceFactory } from "./mixins/hero-race/hero-race.factory";
import { HeroFactory } from "./mixins/hero/hero.factory";

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