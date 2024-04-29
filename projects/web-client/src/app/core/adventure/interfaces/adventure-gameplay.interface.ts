import { IAdventureGameplayStateDto } from "@game-logic/gameplay/state/adventure/adventure-gameplay.interface";
import { IPersistableGameState } from "../../game-persistence/interfaces/persisted-game.interface";
import { IGameMetadata } from "../../game-builder/interfaces/game-metadata.interface";

export interface IAdventureGameplay extends IAdventureGameplayStateDto, IGameMetadata {
  
}