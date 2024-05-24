
import { ObjectTraverser } from "../../infrastructure/extensions/object-traverser";
import { Guid } from "../../infrastructure/extensions/types";
import { IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { MixinService } from "../../infrastructure/mixin/mixin.service";
import { IEntity, IEntityDeclaration } from "./entity.interface";

export class EntityService {
  private _state: { entities: IEntityDeclaration[] } = { entities: [] };
 
  constructor(
    private readonly _mixinFactory: MixinService
  ) { }
  
  public async create<T>(data: IEntityDeclaration): Promise<IEntityDeclaration & T> {
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
  

  public useFactories(factories: IMixinFactory<unknown>[]): void {
    this._mixinFactory.useFactories(factories);
  }


  public getEntityById<T>(entityId: Guid): (IEntityDeclaration & T) | undefined {
    return this._state.entities.find(e => e.id === entityId) as (IEntityDeclaration & T);
  }


  public getEntity<T>(d: (e: IEntityDeclaration & T) => boolean): (IEntityDeclaration & T) | undefined {
    return this._state.entities.find(d) as (IEntityDeclaration & T);
  }


  public getEntities<T>(d: (e: IEntityDeclaration & T) => boolean): (IEntityDeclaration & T)[] {
    return this._state.entities.filter(d) as (IEntityDeclaration & T)[];
  }


  public getAllEntities<T>(): (IEntityDeclaration & T)[] {

    return this._state.entities as (IEntityDeclaration & T)[];
  }


  public async hydrate(state: { entities: IEntityDeclaration[] }): Promise<void> {
    this._state.entities = [];
    for (let entity of state.entities) {
      const initializedEntity = await this.create(entity);
      this._state.entities.push(initializedEntity);
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