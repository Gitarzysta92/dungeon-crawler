import { IAdventureGameplayDeclaration as IAg } from "@game-logic/gameplay/modules/adventure/adventure.interface";
import { IPersistableGameState } from "../../game-persistence/interfaces/persisted-game.interface";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { IGameMetadata } from "../../game-builder/interfaces/game-metadata.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";

export type IAdventureGameplayDeclaration =
  IAg &
  ISceneMediumDeclaration &
  IPersistableGameState &
  IGameMetadata &
  INarrativeMedium
  