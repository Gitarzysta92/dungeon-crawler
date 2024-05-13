import { IEntity } from "../../../../../lib/base/entity/entity.interface";
import { IMixinFactory } from "../../../../../lib/base/mixin/mixin.interface";
import { Constructor } from "../../../../../lib/extensions/types";
import { IAbility } from "../../../../../lib/modules/abilities/entities/ability/ability.interface";
import { Size, Side } from "../../../../../lib/modules/board/entities/board-object/board-object.constants";
import { IPerk } from "../../../../../lib/modules/perks/perk.interface";
import { IStatistic } from "../../../../../lib/modules/statistics/entities/statistic/statistic.interface";
import { IHeroRace } from "./hero-race.interface";

export class HeroRaceFactory implements IMixinFactory<IHeroRace>  {

  constructor() { }
  
  public validate(e: IHeroRace): boolean {
    return e.isHeroRace;
  };

  public create(bc: Constructor<IEntity>): Constructor<IHeroRace> {
    class HeroRace extends bc implements IHeroRace {
      abilities: IAbility[];
      perks: IPerk[];
      size: Size;
      outlets: Side[];
      statistics: IStatistic[];
      isHeroRace = true as const;

      constructor(d: IHeroRace) {
        super(d);
        this.abilities = d.abilities;
        this.perks = d.perks;
        this.statistics = d.statistics;
      }

    }

    return HeroRace; 
  };
}


