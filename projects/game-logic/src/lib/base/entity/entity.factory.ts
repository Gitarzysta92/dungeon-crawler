import { Constructor } from "../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { IEntity, IEntityDeclaration } from "./entity.interface";



export class EntityFactory implements IMixinFactory<IEntity>  {

  public validate(e: IEntity): boolean {
    return e.isEntity;
  };
  
  public create(e: Constructor<IMixin & IEntity>): Constructor<IEntity> { 
    return class Entity extends e implements IEntity {
      public id: string;
      public toRemove?: boolean;
      public isEntity: true = true;
    
      constructor(data: IEntityDeclaration) {
        super(data);
        this.id = data.id;
        this.toRemove = data.toRemove;
      }
    
      public onInitialize() {
        super.onInitialize && super.onInitialize();
      };
      public onDestroy() { 
        super.onDestroy && super.onDestroy();
      };
    
      public toJSON(): IEntityDeclaration {
        return this;
      }
      public clone(): Entity {
        return this;
      };
    
    };
  }
}