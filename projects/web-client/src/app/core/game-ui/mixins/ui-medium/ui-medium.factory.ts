
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { IUiMedium, IUiData } from "./ui-medium.interface";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";

export class UiVisualMediumFactory implements IMixinFactory<IUiMedium> {

  public validate(e: IUiMedium): boolean {
    return e.isUiMedium;
  }

  public create(e: Constructor<IEntity>): Constructor<IUiMedium> {
    class UiMedium extends e implements IUiMedium {
      uiData: IUiData;
      isUiMedium = true as const;

      constructor(d: IUiMedium) {
        super(d);
        this.uiData = d.uiData
      }

    }
    return UiMedium;
  }


}