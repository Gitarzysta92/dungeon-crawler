
import { IAreaDeclaration, INestedAreaDeclaration } from "../../lib/modules/areas/entities/area/area.interface"
import { LEVELED_UP_EVENT } from "../../lib/modules/progression/aspects/events/leveled-up.event"
import { FIRST_AREA_ID, SECOND_AREA_ID, VENDOR_CHARACTER_ID } from "./common-identifiers.data"

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
      fromAreaId: FIRST_AREA_ID,
      toAreaId: SECOND_AREA_ID,
      distance: 10
    }
  ],
  nestedAreas: [
    firstAreaTavern,
    firstAreaDungeon
  ],
  isUnlocked: true,
  unlockWhen: []
}

export const secondArea: IAreaDeclaration = {
  id: SECOND_AREA_ID,
  isArea: true,
  isEntity: true,
  areaConnections: [
    {
      fromAreaId: SECOND_AREA_ID,
      toAreaId: FIRST_AREA_ID,
      distance: 10
    }
  ],
  nestedAreas: [],
  isUnlocked: false,
  unlockWhen: [{ delegateId: LEVELED_UP_EVENT, payload: { progressable: "{{$.bearer}}" } }]
}