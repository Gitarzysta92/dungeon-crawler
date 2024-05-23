import { IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { MixinService } from "../../infrastructure/mixin/mixin.service";

export class ActivityService {

  constructor(private readonly _mixinFactory: MixinService) {}

  public useFactories(factories: IMixinFactory<unknown>[]): void {
    this._mixinFactory.useFactories(factories);
  }

}