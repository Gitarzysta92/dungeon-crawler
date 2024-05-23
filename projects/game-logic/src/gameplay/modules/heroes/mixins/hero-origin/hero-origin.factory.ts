
import { IEntity } from "../../../../../lib/base/entity/entity.interface";
import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory } from "../../../../../lib/infrastructure/mixin/mixin.interface";
import { IHeroOrigin } from "./hero-origin.interface";

export class HeroOriginFactory implements IMixinFactory<IHeroOrigin>  {

  constructor() { }
  
  public validate(e: IHeroOrigin): boolean {
    return e.isHeroOrigin;
  };

  public create(bc: Constructor<IEntity>): Constructor<IHeroOrigin> {
    class HeroOrigin extends bc implements IHeroOrigin {
      isHeroOrigin = true as const;
      startingAreaId: string;
      activeQuestIds: string[];

      constructor(d: IHeroOrigin) {
        super(d);
        this.startingAreaId = d.startingAreaId;
        this.activeQuestIds = d.activeQuestIds;
      }
      
    }

    return HeroOrigin; 
  };
}


