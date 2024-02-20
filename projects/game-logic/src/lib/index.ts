import { DataGatheringService } from "./cross-cutting/gatherer/data-gathering-service";
import { EntityService } from "./base/entity/entity.service";
import { EventService } from "./base/event/event.service";
import { ActionService } from "./cross-cutting/action/action.service";
import { ModifierService } from "./cross-cutting/modifier/modifier.service";
import { SelectorService } from "./cross-cutting/selector/selector.service";

export function initializeLib() {
  const eventService = new EventService();
  const entityService = new EntityService();
  const modifierService = new ModifierService(entityService);
  const actionService = new ActionService(entityService);
  const selectorService = new SelectorService(entityService);
  const gatheringService = new DataGatheringService();
  return {
    eventService,
    entityService,
    modifierService,
    actionService,
    selectorService,
    gatheringService
  }
}