import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { IActorDataFeed } from "../../actors.interface";
import { IActor, IActorDeclaration } from "./actor.interface";
import { Entity } from "../../../../base/entity/entity";
import { Constructor } from "../../../../extensions/types";

export class ActorFactory implements IMixinFactory<IActor> {

  constructor(
    private readonly _dataFeed: IActorDataFeed
  ) { }
  
  public validate(e: IEntityDeclaration & Partial<IActor>): boolean {
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
        this.sourceActorId = d.sourceActorId;
      }
  
    }
    return Actor;
  };

}