
import { IPersistableGameState } from "../../game-persistence/interfaces/persisted-game.interface";
import { IGameMetadata } from "../../game-builder/interfaces/game-metadata.interface";
import { IAdventureState } from "@game-logic/gameplay/modules/adventure/mixins/adventure-state/adventure-state.interface";
import { INarrationMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/visual-medium/ui-medium.interface";
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";
import { ISceneMedium, ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";

export type IAdventureGameplayState =
  Omit<IAdventureState, 'entities'> &
  IGameMetadata &
  IPersistableGameState &
  INarrationMedium &
  IUiMedium &
  ISceneMediumDeclaration &
  { entities: IGameplayEntity[] }

export type IGameplayEntity = IEntity & Partial<IUiMedium> & Partial<ISceneMedium>