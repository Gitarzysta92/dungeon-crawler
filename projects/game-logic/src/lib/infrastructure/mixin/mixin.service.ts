
import { ObjectTraverser } from "../extensions/object-traverser";
import { MixinBase } from "./mixin";
import { IMixin, IMixinFactory } from "./mixin.interface";

export class MixinService {

  private _factories: IMixinFactory<unknown>[] = [];

  public useFactories(factories: IMixinFactory<unknown>[]): void {
    this._factories = this._factories.concat(factories);
  }

  public async create<T>(data: T, o?: {
    recursive?: boolean
    validate?: (o: T) => boolean,
    postInitialize?: (o: T) => void
  }) {

    if (o?.recursive) {
      const mixins: { setter: (o: T) => void, o: T }[] = [];
      ObjectTraverser.traverse(data, (p, k, o: T) => {
        if ((o as IMixin)?.isMixin && (!p?.validate || p?.validate(o)) && o !== data) {
          mixins.push({ setter: (o) => p[k] = o, o: o });
        }
      })

      for (let mixin of mixins) {
        const factories = await this._pickFactories(mixin.o);
        const BaseClass = factories.reduce((c, f) => f.create(c, data), MixinBase);
        const instance = new BaseClass(mixin.o); 
        o?.postInitialize && o.postInitialize(instance);
        mixin.setter(instance);
      }
    }

    const factories = await this._pickFactories(data);
    const BaseClass = factories.reduce((c, f) => f.create(c, data), MixinBase);
    const instance = new BaseClass(data) as T;
    o?.postInitialize && o.postInitialize(instance);
    return instance;
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
