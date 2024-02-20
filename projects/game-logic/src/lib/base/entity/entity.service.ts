import { Constructor, Guid } from "../../extensions/types";
import { EntityLifecycle } from "./entity.constants";
import { IEntity, IEntityFactory } from "./entity.interface";

export class EntityService {

  private _state: { entities: IEntity[] };
  private _factories: IEntityFactory<unknown>[] = [];
 
  constructor() { }

  private _mix(constructors: Constructor[]) {  
    //const constructors = [];
    class Entity implements IEntity {
      id: string;
      lifecycle: EntityLifecycle;
      wasUsed?: boolean;
      toRemove?: boolean;
      isEntity: true;
      constructor(...args) {
        // console.log(constructors)
        // constructors.forEach(c => Object.assign(this, new c(args)))
      }
    };
    constructors.forEach((c) => {
      Object.getOwnPropertyNames(c.prototype).forEach((name, i) => {
        if (name !== 'constructor') {
          const prop = Object.getOwnPropertyDescriptor(c.prototype, name);
          Object.defineProperty(Entity.prototype, name, prop || Object.create(null));
        } 
      });
    });
    return Entity;
  }
  
  public async create(data: IEntity) {
    const factoriesToProcess: IEntityFactory<unknown>[] = [];
    for (let factory of this._factories) {
      const validated = (factory.validate && factory.validate(data)) ||
        (factory.validateAsync && await factory.validateAsync(data))
      if (!validated) {
        continue;
      }
      factoriesToProcess.push(factory);
    }

    const EntityClass = this._mix(factoriesToProcess.map(f => f.classDefinition));
    const entity = new EntityClass();
    for (let ftp of factoriesToProcess) {
      let mixin;
      if (ftp.createAsync) {
        mixin = await ftp.createAsync(data);
      } else {
        mixin = ftp.create(data);
      }
      Object.assign(entity, mixin);
    }
    return entity;
  }


  public useFactories(factories: any[]): void {
    this._factories = factories;
  }


  public getEntity<T>(entityId: Guid): (IEntity & T) | undefined {
    return this._state.entities.find(e => e.id === entityId) as (IEntity & T);
  }


  public getEntities<T>(d: (e: IEntity & T) => boolean): (IEntity & T)[] {
    return this._state.entities.filter(d) as (IEntity & T)[];
  }


  public getAllEntities<T>(): (IEntity & T)[] {
    return this._state.entities as (IEntity & T)[];
  }


  public async hydrate(state: { entities: IEntity[] }): Promise<void> {
    this._state.entities = [];
    for (let entity of state.entities) {
      const initializedEntity = await this.create(entity);
      this._state.entities.push(initializedEntity);
    }
  }


  public dehydrate(state: { entities?: IEntity[] }): void {
    Object.assign(state, this._state);
  }


  public traverse(entity: IEntity, arg1: () => boolean): any[] {
    throw new Error("Method not implemented.");
  }
}