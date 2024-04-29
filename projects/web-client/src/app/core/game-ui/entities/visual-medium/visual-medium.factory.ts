import { Constructor } from "@game-logic/lib/extensions/types";
import { IMixinFactory } from "@game-logic/lib/base/mixin/mixin.interface";
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";
import { IVisualMedium, IVisualUiData } from "./visual-medium.interface";

export class VisualMediumFactory implements IMixinFactory<IVisualMedium> {

  public validate(e: IVisualMedium): boolean {
    return e.isVisualMedium;
  }

  public create(e: Constructor<IEntity>): Constructor<IVisualMedium> {
    class VisualMedium extends e implements IVisualMedium {

      visual: { ui?: IVisualUiData; scene?: null; };
      isVisualMedium = true as const;

      constructor(d: IVisualMedium) {
        super(d);
        this.visual = d.visual;
      }
    }
    return VisualMedium;
  }


}