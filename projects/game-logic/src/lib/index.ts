import { DataGatheringService } from "./cross-cutting/gatherer/data-gathering-service";
import { EntityService } from "./base/entity/entity.service";
import { EventService } from "./cross-cutting/event/event.service";
import { ActionService } from "./cross-cutting/action/action.service";
import { ModifierService } from "./cross-cutting/modifier/modifier.service";
import { SelectorService } from "./cross-cutting/selector/selector.service";
import { EntityFactory } from "./base/entity/entity.factory";

export function initializeLib() {
  const eventService = new EventService();
  const entityFactory = new EntityFactory()
  const entityService = new EntityService(entityFactory);
  const modifierService = new ModifierService(entityService);
  const actionService = new ActionService();
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