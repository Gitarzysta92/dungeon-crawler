
import { EventService } from "../../cross-cutting/event/event.service";
import { TurnBasedGameplayService } from "./turn-based-gameplay.service";

export class TurnBasedGameplayModule {
  constructor(
    private readonly _eventService: EventService
  ) { }
  
  public initialize() {
    const turnBasedService = new TurnBasedGameplayService(this._eventService);
    return { turnBasedService }
  }
}