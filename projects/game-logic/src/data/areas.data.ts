import { AreaType, AreaUnlockConditionType } from "../lib/features/adventure/area.constants"
import { IArea, IHeroLevelCondition } from "../lib/features/adventure/area.interface"
import { firstAreaId, secondAreaId, firstAreaTavernId, dungeonAreaId } from "./common-identifiers.data"

export const firstAreaTavern: IArea = {
  id: firstAreaTavernId,
  areaType: AreaType.Building,
  parentAreaId: firstAreaId,
  areaConnections: [],
  unlockConditions: []
}


export const firstAreaDungeon: IArea = {
  id: dungeonAreaId,
  areaType: AreaType.Dungeon,
  parentAreaId: firstAreaId,
  areaConnections: [],
  unlockConditions: []
}

export const firstArea: IArea = {
  id: firstAreaId,
  areaType: AreaType.Town,
  areaConnections: [
    {
      fromAreaId: firstAreaId,
      toAreaId: secondAreaId,
      distance: 10
    }
  ],
  unlockConditions: [
    {
      conditionType: AreaUnlockConditionType.HeroLevel,
      level: 1,
    } as IHeroLevelCondition
  ],
  childAreaIds: [
    firstAreaTavern.id,
    firstAreaDungeon.id
  ]
} 

export const secondArea: IArea = {
  id: secondAreaId,
  areaType: AreaType.Town,
  areaConnections: [
    {
      fromAreaId: secondAreaId,
      toAreaId: firstAreaId,
      distance: 10
    }
  ],
  unlockConditions: [
    {
      conditionType: AreaUnlockConditionType.HeroLevel,
      level: 2,
    } as IHeroLevelCondition
  ]
} 
