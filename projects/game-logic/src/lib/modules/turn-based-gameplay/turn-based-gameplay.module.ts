
import { EventService } from "../../cross-cutting/event/event.service";


export class TurnBasedGameplayModule {
  constructor(
    private readonly _eventService: EventService
  ) { }
  
  public initialize() {
  }
}