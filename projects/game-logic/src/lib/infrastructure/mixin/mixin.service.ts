
import { ObjectTraverser } from "../extensions/object-traverser";
import { MixinBase } from "./mixin";
import { IMixin, IMixinFactory } from "./mixin.interface";

export class MixinService {

  private _factories: IMixinFactory<unknown>[] = [];

  public useFactories(factories: IMixinFactory<unknown>[]): void {
    this._factories = this._factories.concat(factories);
  }

  public create<T>(data: T, o?: {
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
        const factories = this._pickFactories(mixin.o);
        const BaseClass = factories.reduce((c, f) => f.create(c, data), MixinBase);
        const instance = new BaseClass(mixin.o); 
        o?.postInitialize && o.postInitialize(instance);
        mixin.setter(instance);
      }
    }

    const factories = this._pickFactories(data);
    const BaseClass = factories.reduce((c, f) => f.create(c, data), MixinBase);
    const instance = new BaseClass(data) as T;
    o?.postInitialize && o.postInitialize(instance);
    return instance;
  }


  private _pickFactories(data: unknown) {
    const factoriesToProcess: IMixinFactory<unknown>[] = [];
    for (let factory of this._factories) {
      const validated = (factory.isApplicable && factory.isApplicable(data))
      if (!validated) {
        continue;
      }
      factoriesToProcess.push(factory);
    }
    return factoriesToProcess;
  }

}
