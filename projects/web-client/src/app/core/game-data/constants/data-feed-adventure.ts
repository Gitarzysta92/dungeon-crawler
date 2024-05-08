import { IAdventureGameplayStateDto } from "@game-logic/gameplay/state/adventure/adventure-gameplay.interface";
import { IPlayer } from "@game-logic/lib/base/player/players.interface";
import { vendorActor } from "./data-feed-actors";
import { firstArea, secondArea } from "./data-feed-areas";

export const adventureTemplate: IAdventureGameplayStateDto = {
  id: "ADAEFB05-8C30-44A5-A14E-099F7E9F609D",
  currentDay: 0,
  entities: [
    firstArea,
    secondArea,
    vendorActor
  ],
  player: {} as IPlayer,
  isAdventureState: true
}