
import { IAdventureMapDeclaration } from "../modules/adventure/mixins/adventure-map/adventure-map.interface";
import { vendorActor } from "./actors.data";
import { area1, area10, area11, area2, area3, area4, area5, area6, area7, area8, area9 } from "./areas.data";


export const adventureTemplate: IAdventureMapDeclaration = {
  id: "ADAEFB05-8C30-44A5-A14E-099F7E9F609D",
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
  isMixin: true,
  isAdventureMap: true
}