
import { TRAVEL_ACTIVITY } from "../../lib/modules/areas/areas.constants"
import { IAreaDeclaration, INestedAreaDeclaration } from "../../lib/modules/areas/entities/area/area.interface"
import { ITEM_RESOURCE_TYPE } from "../../lib/modules/items/items.constants"
import { LEVELED_UP_EVENT } from "../../lib/modules/progression/aspects/events/leveled-up.event"
import { FIRST_AREA_ID, SECOND_AREA_ID, TRAVEL_SUPPLIES_ID } from "./common-identifiers.data"
import { dungeonTemplate } from "./dungeon.data"

export const firstAreaDungeon: INestedAreaDeclaration = {
  isUnlocked: true,
  unlockWhen: []
}

export const firstAreaTavern: INestedAreaDeclaration = {
  isUnlocked: true,
  unlockWhen: []
}

export const firstArea: IAreaDeclaration = {
  id: FIRST_AREA_ID,
  isArea: true,
  isEntity: true,
  areaConnections: [
    {
      toAreaId: SECOND_AREA_ID,
      distance: 10
    }
  ],
  nestedAreas: [
    firstAreaTavern,
    Object.assign(firstAreaDungeon, dungeonTemplate)
  ],
  isUnlocked: true,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  activities: [{ id: TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE, value: 1 }], isMixin: true, isActivity: true }]
}

export const secondArea: IAreaDeclaration = {
  id: SECOND_AREA_ID,
  isArea: true,
  isEntity: true,
  areaConnections: [
    {
      toAreaId: FIRST_AREA_ID,
      distance: 10
    }
  ],
  nestedAreas: [],
  isUnlocked: false,
  unlockWhen: [{ delegateId: LEVELED_UP_EVENT, payload: { progressable: "{{$.traveler}}" } }],
  isMixin: true,
  isActivitySubject: true,
  activities: [{ id: TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE, value: 1 }], isMixin: true, isActivity: true }]
}