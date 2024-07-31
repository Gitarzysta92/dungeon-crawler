import { IAdventureGameplayState as IAg } from "@game-logic/gameplay/modules/adventure/adventure.interface";
import { IPersistableGameState } from "../../game-persistence/interfaces/persisted-game.interface";
import { ISceneMedium, ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { IGameMetadata } from "../../game-builder/interfaces/game-metadata.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";
import { IDungeonGameplayEntityDeclaration } from "@game-logic/gameplay/modules/dungeon/dungeon.interface";

export type IAdventureGameplay =
  IAg &
  ISceneMediumDeclaration &
  IPersistableGameState &
  IGameMetadata &
  INarrativeMedium



export type IAdventureGameplayState =
  IAg &
  IGameMetadata &
  IPersistableGameState &
  INarrativeMedium &
  ISceneMediumDeclaration &
  { entities: IDungeonGameplayEntityDeclaration[]; };


export type IGameplayEntity = IEntity & Partial<IUiMedium> & Partial<ISceneMedium>;
  