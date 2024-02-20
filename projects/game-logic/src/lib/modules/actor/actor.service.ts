import { EntityService } from "../../base/entity/entity.service";
import { Guid } from "../../extensions/types";
import { Actor } from "./actor";
import { IActor } from "./actor.interface";
import { IDefeatable } from "./defeatable/defeatable.interface";
import { v4 } from "uuid";

export class ActorsService {
  
  constructor(
    private readonly _entityService: EntityService
  ) { }

  public addActor(actor: IActor) {
    this._entityService.create(Object.assign(actor, { id: v4() }));
  }

  public getActor<T extends Actor>(selectedHeroId: Guid): T {
    return this._entityService.getEntity<T>(selectedHeroId);
  }

  public getAllActors<T extends Actor>(): Array<T> {
    return this._entityService.getEntities<T>(a => a.isActor);
  }

  public tryRemoveDefeatedActors(): void {
    this._entityService
      .getEntities<Actor & IDefeatable<[]>>(e => e.isActor && e.isDefeatable && e.isDefeated)
      .forEach(e => e.toRemove = true)
  }

}