import { v4 } from "uuid";
import { EventService } from "../../cross-cutting/event/event.service";
import { DefeatedEvent } from "./aspects/events/defeated.event";
import { IActor } from "./entities/actor/actor.interface";
import { EntityService } from "../../base/entity/entity.service";
import { Guid } from "../../infrastructure/extensions/types";
import { IDefeatable } from "../combat/entities/defeatable/defeatable.interface";

export class ActorsService {
  
  constructor(
    private readonly _entityService: EntityService,
    private readonly _eventService: EventService
  ) { }

  public addActor(actor: IActor) {
    this._entityService.create(Object.assign(actor, { id: v4() }));
  }

  public getActor<T extends IActor>(id: Guid): T {
    return this._entityService.getEntityById<T>(id);
  }

  public getAllActors<T extends IActor>(): Array<T> {
    return this._entityService.getEntities<T>(a => a.isActor);
  }

  public tryRemoveDefeatedActors(): void {
    this._entityService
      .getEntities<IActor & IDefeatable>(e => e.isActor && e.isDefeatable && e.isDefeated && !e.toRemove)
      .forEach(e => {
        this._eventService.emit(new DefeatedEvent(e))
        e.toRemove = true;
      })
  }

} 