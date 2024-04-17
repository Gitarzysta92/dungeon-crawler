import { ObjectTraverser } from "../../extensions/object-traverser";
import { IMixin, IMixinFactory } from "./mixin.interface";

class MixinBase implements IMixin {
  isMixin: true;
}

export class MixinFactory {

  private _factories: IMixinFactory<unknown>[] = [];

  public useFactories(factories: IMixinFactory<unknown>[]): void {
    this._factories = this._factories.concat(factories);
  }

  public async create<T>(
    data: T,
    validate?: (o: T) => boolean
  ) {
    const mixins: { setter: (o: T) => void, o: T }[] = [];
    ObjectTraverser.traverse(data, (p, k, o: T) => {
      if ((o as IMixin).isMixin && (!validate || validate(o)) && o !== data) {
        mixins.push({ setter: (o) => p[k] = o, o: o });
      }
    })

    for (let mixin of mixins) {
      const factories = await this._pickFactories(mixin.o);
      const BaseClass = factories.reduce((c, f) => f.create(c, data), MixinBase);
      mixin.setter(new BaseClass(mixin.o))
    }

    const factories = await this._pickFactories(data);
    const BaseClass = factories.reduce((c, f) => f.create(c, data), MixinBase);
    const c = new BaseClass(data) as T;
    return c;
  }


  private async _pickFactories(data: unknown) {
    const factoriesToProcess: IMixinFactory<unknown>[] = [];
    for (let factory of this._factories) {
      const validated = (factory.validate && factory.validate(data)) ||
        (factory.validateAsync && await factory.validateAsync(data))
      if (!validated) {
        continue;
      }
      factoriesToProcess.push(factory);
    }
    return factoriesToProcess;
  }

}
