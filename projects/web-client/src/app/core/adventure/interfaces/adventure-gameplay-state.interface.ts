
import { IPersistableGameState } from "../../game-persistence/interfaces/persisted-game.interface";
import { IGameMetadata } from "../../game-builder/interfaces/game-metadata.interface";
import { IAdventureState } from "@game-logic/gameplay/modules/adventure/mixins/adventure-state/adventure-state.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";

export type IAdventureGameplayState =
  Omit<IAdventureState, 'entities'> &
  IGameMetadata &
  IPersistableGameState &
  INarrationMedium &
  IVisualMedium<unknown, any> &
  { entities: IGameplayEntity[] }

export type IGameplayEntity = IEntity & Partial<IVisualMedium<unknown, any>>