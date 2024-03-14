import { Guid } from "../../extensions/types";
import { EntityFactory } from "./entity.factory";
import { IEntity, IEntityFactory } from "./entity.interface";

export class EntityService {

  private _state: { entities: IEntity[] };
 
  constructor(
    private readonly _entityFactory: EntityFactory
  ) { }
  
  public async create<T>(data: IEntity): Promise<IEntity & T> {
    return this._entityFactory.create(data) as unknown as Promise<IEntity & T>;
  }
  

  public useFactories(factories: IEntityFactory<unknown>[]): void {
    this._entityFactory.useFactories(factories);
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


  public traverse(entity: Partial<IEntity>, arg1: () => boolean): any[] {
    throw new Error("Method not implemented.");
  }
}