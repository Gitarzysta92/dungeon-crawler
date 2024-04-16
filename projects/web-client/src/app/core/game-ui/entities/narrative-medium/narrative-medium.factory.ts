import { IEntityDeclaration, IEntityFactory } from "@game-logic/lib/base/entity/entity.interface";
import { INarrationMedium } from "./narrative-medium.interface";
import { Constructor } from "@game-logic/lib/extensions/types";
import { Entity } from "@game-logic/lib/base/entity/entity";

export class NarrativeMediumFactory implements IEntityFactory<INarrationMedium> {

  public validate(e: IEntityDeclaration & Partial<INarrationMedium>): boolean {
    return e.isNarrationMedium;
  }

  public create(e: typeof Entity): Constructor<INarrationMedium> {
    class NarrativeMedium extends e implements INarrationMedium {

      narrative: { name: string; description: string; };
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