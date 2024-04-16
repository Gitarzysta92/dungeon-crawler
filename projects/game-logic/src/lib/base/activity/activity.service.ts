import { MixinFactory } from "../mixin/mixin.factory";
import { IMixinFactory } from "../mixin/mixin.interface";


export class ActivityService {

  constructor(private readonly _mixinFactory: MixinFactory) {}

  public useFactories(factories: IMixinFactory<unknown>[]): void {
    this._mixinFactory.useFactories(factories);
  }

}