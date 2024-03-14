import { IEntity, IEntityFactory } from "../../../../base/entity/entity.interface";
import { IActorDataFeed } from "../../actors.interface";
import { IActor, IActorDeclaration } from "./actor.interface";
import { Entity } from "../../../../base/entity/entity";
import { Constructor } from "../../../../extensions/types";

export class ActorFactory implements IEntityFactory<IActor> {

  constructor(
    private readonly _dataFeed: IActorDataFeed
  ) { }
  
  public validate(e: IEntity & Partial<IActor>): boolean {
    return e.isActor;
  };

  public create(e: typeof Entity): Constructor<IActor> {
    class Actor extends e implements IActor {
  
      isActor = true as const;
      groupId?: string;
      controllable?: boolean;
      sourceActorId?: string;
    
      constructor(d: IActorDeclaration) {
        super(d);
        this.groupId = d.groupId;
        this.controllable = d.controllable;
        this.sourceActorId = d.sourceActorId;
      }
  
    }
    return Actor;
  };

}