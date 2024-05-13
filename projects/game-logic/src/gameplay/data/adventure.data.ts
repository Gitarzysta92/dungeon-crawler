
import { IAdventureMapDeclaration } from "../modules/adventure/mixins/adventure-map/adventure-map.interface";
import { vendorActor } from "./actors.data";
import { firstArea, secondArea } from "./areas.data";


export const adventureTemplate: IAdventureMapDeclaration = {
  id: "ADAEFB05-8C30-44A5-A14E-099F7E9F609D",
  entities: [
    firstArea,
    secondArea,
    vendorActor
  ],
  isMixin: true,
  isAdventureMap: true
}