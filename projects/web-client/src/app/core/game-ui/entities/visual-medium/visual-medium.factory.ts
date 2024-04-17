import { Constructor } from "@game-logic/lib/extensions/types";
import { INarrationMedium } from "../narrative-medium/narrative-medium.interface";
import { IMixinFactory } from "@game-logic/lib/base/mixin/mixin.interface";
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";

export class VisualMediumFactory implements IMixinFactory<INarrationMedium> {

  public validate(e: INarrationMedium): boolean {
    return e.isNarrationMedium;
  }

  public create(e: Constructor<IEntity>): Constructor<INarrationMedium> {
    class NarrativeMedium extends e implements INarrationMedium {

      narrative: { name: string; description: string; };
      isNarrationMedium = true as const;
      isMixin = true as const;

      constructor(d: INarrationMedium) {
        super(d);
        this.narrative.name = d.narrative.name;
        this.narrative.description = d.narrative.description;
      }
    }
    return NarrativeMedium;
  }


}