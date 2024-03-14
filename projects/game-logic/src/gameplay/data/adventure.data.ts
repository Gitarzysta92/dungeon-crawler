
import { IAdventureGameplayTemplate } from "../adventure/adventure.interface";
import { firstArea } from "./areas.data";
import { GATHER_ITEM_QUEST_ID } from "./common-identifiers.data";


export const adventureTemplate: IAdventureGameplayTemplate = {
  currentDay: 0,
  startingAreaId: firstArea.id,
  activeQuestIds: [GATHER_ITEM_QUEST_ID]
}