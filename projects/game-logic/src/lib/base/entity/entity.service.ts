import { ObjectTraverser } from "../../extensions/object-traverser";
import { Guid } from "../../extensions/types";
import { IEntity, IEntityDeclaration } from "./entity.interface";
import { IMixinFactory } from "../mixin/mixin.interface";
import { MixinFactory } from "../mixin/mixin.factory";

export class EntityService {
  private _state: { entities: IEntityDeclaration[] };
 
  constructor(
    private readonly _mixinFactory: MixinFactory
  ) { }
  
  public async create<T>(data: IEntityDeclaration & T): Promise<IEntityDeclaration & T> {
    return this._mixinFactory.create<IEntityDeclaration & T>(data, e => e.isEntity);
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
    throw new Error("Method not implemented.");
  }

  public traverseEntities<T>(cb: (e: T & IEntityDeclaration) => void) {
    this._state.entities.forEach(e => {
      ObjectTraverser.traverse(e, (p, k, o: IEntityDeclaration) => cb(o as T & IEntityDeclaration))
    })
  }

}