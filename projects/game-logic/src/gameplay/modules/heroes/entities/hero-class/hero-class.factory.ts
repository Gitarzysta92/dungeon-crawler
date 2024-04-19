import { IEntity } from "../../../../../lib/base/entity/entity.interface";
import { IMixinFactory } from "../../../../../lib/base/mixin/mixin.interface";
import { Constructor } from "../../../../../lib/extensions/types";
import { IAbility } from "../../../../../lib/modules/abilities/entities/ability/ability.interface";
import { IPerk } from "../../../../../lib/modules/perks/perk.interface";
import { IHeroClass } from "./hero-class.interface";

export class HeroClassFactory implements IMixinFactory<IHeroClass>  {

  constructor() { }
  
  public validate(e: IHeroClass): boolean {
    return e.isHeroClass;
  };

  public create(bc: Constructor<IEntity>): Constructor<IHeroClass> {
    class HeroClass extends bc implements IHeroClass {
      abilities: IAbility[];
      perks: IPerk[];
      isHeroClass = true as const;

      constructor(d: IHeroClass) {
        super(d);
        this.abilities = d.abilities;
        this.perks = d.perks;
      }
    }

    return HeroClass; 
  };
}


