
import { IPersistableGameState } from "../../game-persistence/interfaces/persisted-game.interface";
import { IGameMetadata } from "../../game-builder/interfaces/game-metadata.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IDungeonState } from "@game-logic/gameplay/modules/dungeon/mixins/dungeon-state/dungeon-state.interface";

export type IDungeonGameplayState = IDungeonState & IGameMetadata & IPersistableGameState & INarrationMedium & IVisualMedium<any, any>