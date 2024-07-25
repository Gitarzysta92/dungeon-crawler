import { IDungeonGameplayDeclaration as IDg } from "@game-logic/gameplay/modules/dungeon/dungeon.interface";
import { IGameMetadata } from "../../game-builder/interfaces/game-metadata.interface";
import { IPersistableGameState } from "../../game-persistence/interfaces/persisted-game.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";

export type IDungeonGameplayDeclaration =
  IDg &
  ISceneMediumDeclaration &
  IPersistableGameState &
  IGameMetadata &
  INarrativeMedium;