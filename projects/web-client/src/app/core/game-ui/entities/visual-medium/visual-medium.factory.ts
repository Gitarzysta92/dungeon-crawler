import { IEntityDeclaration, IEntityFactory } from "@game-logic/lib/base/entity/entity.interface";
import { Entity } from "@game-logic/lib/base/entity/entity";
import { Constructor } from "@game-logic/lib/extensions/types";
import { INarrationMedium } from "../narrative-medium/narrative-medium.interface";

export class VisualMediumFactory implements IEntityFactory<INarrationMedium> {

  public validate(e: IEntityDeclaration & Partial<INarrationMedium>): boolean {
    return e.isNarrationMedium;
  }

  public create(e: typeof Entity): Constructor<INarrationMedium> {
    class NarrativeMedium extends e implements INarrationMedium {

      narrative: { name: string; description: string; };
      isNarrationMedium = true as const;

      constructor(d: INarrationMedium) {
        super(d);
        this.narrative.name = d.narrative.name;
        this.narrative.description = d.narrative.description;
      }
    }
    return NarrativeMedium;
  }


}