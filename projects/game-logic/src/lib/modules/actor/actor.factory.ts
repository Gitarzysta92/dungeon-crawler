import { IEntity, IEntityFactory } from "../../base/entity/entity.interface";
import { Actor } from "./actor";
import { IActor, IActorDataFeed } from "./actor.interface";

export class ActorFactory implements IEntityFactory<Actor> {

  public get classDefinition() { return Actor };

  constructor(
    private readonly _dataFeed: IActorDataFeed
  ) { }
  
  public create(e: IActor): Actor {
    return new Actor(e);
  };

  public validate(e: IEntity & Partial<IActor>): boolean {
    return e.isActor;
  };

}