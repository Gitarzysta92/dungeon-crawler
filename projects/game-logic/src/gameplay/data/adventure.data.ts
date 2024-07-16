import { IAdventureGameplayDeclaration } from "../modules/adventure/adventure.interface";
import { vendorActor } from "./actors.data";
import { area1, area10, area11, area2, area3, area4, area5, area6, area7, area8, area9 } from "./areas.data";


export const adventureTemplate: IAdventureGameplayDeclaration = {
  id: "ADAEFB05-8C30-44A5-A14E-099F7E9F609D",
  currentDay: 0,
  entities: [
    area1,
    area2,
    area3,
    area4,
    area5,
    area6,
    area7,
    area8,
    area9,
    area10,
    area11,
    vendorActor
  ],
  isAdventureGameplay: true
}