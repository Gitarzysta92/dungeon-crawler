import { NotEnumerable } from "../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { IEntity, IEntityDeclaration } from "./entity.interface";
import { EntityService } from "./entity.service";



export class EntityFactory implements IMixinFactory<IEntity>  {

  constructor(
    private readonly _entityService: EntityService
  ) {}

  public isApplicable(e: IEntity): boolean {
    return e.isEntity;
  };
  
  public create(e: Constructor<IMixin & IEntity>): Constructor<IEntity> {
    const entityService = this._entityService;
    class Entity extends e implements IEntity {
      public id: string;
      public toRemove?: boolean;
      public isEntity: true = true;
      public tags?: (string | number)[];
      public entities: IEntity[];

      @NotEnumerable()
      public entityParent: IEntity;

      constructor(data: IEntityDeclaration) {
        super(data);
        this.id = data.id;
        this.toRemove = data.toRemove;
        this.tags = data.tags;
        this.entities = data.entities as IEntity[] ?? [];
      }

      public onInitialize() {
        super.onInitialize && super.onInitialize();
        for (let entity of this.entities) {
          Object.defineProperty(entity, 'entityParent', { value: this, enumerable: false })
        }
      };

      public onDestroy() { 
        super.onDestroy && super.onDestroy();
      };

      public getRootEntity<T>(): T & IEntity {
        if (!this.entityParent) {
          return this as unknown as T & IEntity
        }
        return this.entityParent.getRootEntity(); 
      }

      public getEntities<T>(d: (e: IEntity & T) => boolean): (IEntity & T)[] {
        return this?.entities.filter(d) as (IEntity & T)[] || [];
      }

      public getEntity<T>(d: (e: IEntity & T) => boolean): (IEntity & T) {
        return this?.entities.find(d) as (IEntity & T);
      }

      public createEntity<T extends IEntity = IEntity>(e: IEntityDeclaration): T {
        return entityService.createSync(e);
      }

      public registerEntity(e: IEntity): void {
        if (!Array.isArray(this.entities)) {
          this.entities = [];
        }
        this.entities.push(e);
      }

      public unregisterEntity(e: IEntity): void {
        const index = this.entities.indexOf(e);
        if (index < 0) {
          throw new Error("Cannot unregister entity that not exists")
        }
        this.entities.splice(index, 1);
        e.onDestroy();
      }
    
      public isLocked(): boolean {
        return false;
      }
    
      public toJSON(): IEntityDeclaration {
        return this;
      }
      public clone(): Entity {
        return this;
      };
    
    };
    return Entity;
  }
}