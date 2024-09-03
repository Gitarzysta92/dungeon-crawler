
import { ObjectTraverser } from "../../infrastructure/extensions/object-traverser";
import { Guid } from "../../infrastructure/extensions/types";
import { IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { MixinService } from "../../infrastructure/mixin/mixin.service";
import { IEntity, IEntityDeclaration } from "./entity.interface";


export class EntityService {
  private _state: { entities: IEntity[] } = { entities: [] };
 
  constructor(
    private readonly _mixinFactory: MixinService
  ) { }

  public createSync<T>(data: IEntityDeclaration & any): IEntity & T {
    const entity = this._mixinFactory.create<IEntityDeclaration>(
      data,
      {
        validate: e => e.isEntity,
        postInitialize: e => (e as IEntity).onInitialize && (e as IEntity).onInitialize(),
        recursive: true
      }
    ) as unknown as IEntity & T;
    return entity;
  }
  
  public async create<T>(data: IEntityDeclaration): Promise<IEntity & T> {
    const entity = await this._mixinFactory.create<IEntityDeclaration>(
      data,
      {
        validate: e => e.isEntity,
        postInitialize: e => (e as IEntity).onInitialize && (e as IEntity).onInitialize(),
        recursive: true
      }
    ) as unknown as IEntity & T;
    return entity;
  }

  public remove(entity: IEntity): void {
    const index = this._state.entities.indexOf(entity);
    this._state.entities.splice(index, 1);
  }

  public registerEntity(e: IEntity) {
    if (!e.isEntity) {
      throw new Error("Cannot register object that is not a type of entity")
    }
    this._state.entities.push(e);
  }
  

  public useFactories(factories: IMixinFactory<unknown>[]): void {
    this._mixinFactory.useFactories(factories);
  }


  public getEntityById<T>(entityId: Guid): (IEntity & T) | undefined {
    return this._state.entities.find(e => e.id === entityId) as (IEntity & T);
  }


  public getEntity<T>(d: (e: IEntity & T) => boolean): (IEntity & T) | undefined {
    return this._state.entities.find(d) as (IEntity & T);
  }


  public getEntities<T>(d: (e: IEntity & T) => boolean): (IEntity & T)[] {
    return this._state.entities.filter(d) as (IEntity & T)[];
  }


  public getAllEntities<T>(): (IEntity & T)[] {
    return this._state.entities as (IEntity & T)[];
  }


  public async hydrate(state: { entities: IEntityDeclaration[] }): Promise<void> {
    this._state.entities = [];
    for (let entity of state.entities) {
      this.registerEntity(await this.create<IEntity>(entity))
    }
  }


  public dehydrate(state: { entities?: IEntityDeclaration[] }): void {
    Object.assign(state, this._state);
  }


  public traverse(entity: Partial<IEntityDeclaration>, arg1: () => boolean): any[] {
    return [];
  }

  public traverseEntities<T>(cb: (e: T & IEntityDeclaration) => void) {
    this._state.entities.forEach(e => {
      ObjectTraverser.traverse(e, (p, k, o: IEntityDeclaration) => cb(o as T & IEntityDeclaration))
    })
  }

}