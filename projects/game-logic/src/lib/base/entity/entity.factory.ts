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
      public tags?: (string | number)[];
      playerId: any;
      isPawn: any;
    
      constructor(data: IEntityDeclaration) {
        super(data);
        this.id = data.id;
        this.toRemove = data.toRemove;
        this.tags = data.tags;
        this.playerId = (data as any).playerId;
        this.isPawn = (data as any).isPawn;
      }
    
      public onInitialize() {
        super.onInitialize && super.onInitialize();
      };

      public onDestroy() { 
        super.onDestroy && super.onDestroy();
      };

      public isAdjanced(e: IEntity): boolean {
        return false;
      }
    
      public toJSON(): IEntityDeclaration {
        return this;
      }
      public clone(): Entity {
        return this;
      };
    
    };
  }
}