import { ObjectTraverser } from "../../extensions/object-traverser";
import { Entity } from "./entity";
import { IEntity, IEntityFactory } from "./entity.interface";

export class EntityFactory {

  private _factories: IEntityFactory<unknown>[] = [];

  public useFactories(factories: IEntityFactory<unknown>[]): void {
    this._factories = this._factories.concat(factories);
  }


  public async create<T extends IEntity = any>(data: IEntity): Promise<T> {
    const entities: { setter: (o: IEntity) => void, o: IEntity }[] = [];
    ObjectTraverser.traverse(data, (p, k, o: IEntity) => {
      if (o.isEntity && o !== data) {
        entities.push({ setter: (o) => p[k] = o, o: o });
      }
    })

    for (let entity of entities) {
      const factories = await this._pickFactories(entity.o);
      const BaseClass = factories.reduce((c, f) => f.create(c, data), Entity);
      entity.setter(new BaseClass(entity.o))
    }

    const factories = await this._pickFactories(data);
    const BaseClass = factories.reduce((c, f) => f.create(c, data), Entity);
    const c = new BaseClass(data) as T & Entity;
    c.onInitialize();
    return c;
  }


  private async _pickFactories(data: IEntity) {
    const factoriesToProcess: IEntityFactory<unknown>[] = [];
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
