import { IEntity } from "@game-logic/lib/base/entity/entity.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { INarrativeMedium } from "./narrative-medium.interface";

import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";


export class NarrativeMediumFactory implements IMixinFactory<INarrativeMedium> {

  public isApplicable(e: INarrativeMedium): boolean {
    return e.isNarrationMedium;
  }

  public create(e: Constructor<IEntity>): Constructor<INarrativeMedium> {
    class NarrativeMedium extends e implements INarrativeMedium {

      narrative: { name: string; description: string; } = {} as any;
      isNarrationMedium = true as const;
    
      constructor(d: NarrativeMedium) {
        super(d);
        this.narrative.name = d.narrative.name;
        this.narrative.description = d.narrative.description;
      }

    }
    return NarrativeMedium;
  }
}