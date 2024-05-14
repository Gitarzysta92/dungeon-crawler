import { IHeroOriginDeclaration } from "../modules/heroes/mixins/hero-origin/hero-origin.interface";
import { area1 } from "./areas.data";

export const adventurer: IHeroOriginDeclaration = {
  id: "829FEEA3-A80B-46D6-ADAC-07B844F09822",
  startingAreaId: area1.id,
  activeQuestIds: [],
  isHeroOrigin: true,
  isEntity: true,
  isMixin: true
}

export const noble: IHeroOriginDeclaration = {
  id: "CD8A2ADE-19F4-4D03-9C18-FF9C6092F995",
  startingAreaId: area1.id,
  activeQuestIds: [],
  isHeroOrigin: true,
  isEntity: true,
  isMixin: true
}