import { INestedArea1 } from "../lib/entities/areas/nested/nested-area.interface"
import { IRootArea1 } from "../lib/entities/areas/root/root-area.interface"
import { FIRST_AREA_ID, SECOND_AREA_ID, VENDOR_CHARACTER_ID } from "./common-identifiers.data"

export const firstAreaDungeon: INestedArea1 = {
  nestedAreas: [],
  assignedActorsIds: [],
  isUnlocked: true,
  unlockConditions: []
}

export const firstAreaTavern: INestedArea1 = {
  nestedAreas: [],
  assignedActorsIds: [],
  isUnlocked: true,
  unlockConditions: []
}

export const firstArea: IRootArea1 = {
  id: FIRST_AREA_ID,
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
  assignedActorsIds: [
    VENDOR_CHARACTER_ID
  ],
  isUnlocked: true,
  unlockConditions: []
}

export const secondArea: IRootArea1 = {
  id: SECOND_AREA_ID,
  areaConnections: [
    {
      fromAreaId: SECOND_AREA_ID,
      toAreaId: FIRST_AREA_ID,
      distance: 10
    }
  ],
  nestedAreas: [],
  assignedActorsIds: [],
  isUnlocked: true,
  unlockConditions: []
}