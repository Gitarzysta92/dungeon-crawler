
import { IPlayer } from "../../lib/base/player/players.interface";
import { IAdventureGameplayStateDto } from "../state/adventure/adventure-gameplay.interface";
import { vendorCharacter } from "./actors.data";
import { firstArea, secondArea } from "./areas.data";


export const adventureTemplate: IAdventureGameplayStateDto = {
  id: "ADAEFB05-8C30-44A5-A14E-099F7E9F609D",
  currentDay: 0,
  entities: [
    firstArea,
    secondArea,
    vendorCharacter
  ],
  player: {} as IPlayer
}