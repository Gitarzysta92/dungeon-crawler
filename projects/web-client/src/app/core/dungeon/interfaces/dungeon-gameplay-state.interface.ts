
import { IPersistableGameState } from "../../game-persistence/interfaces/persisted-game.interface";
import { IGameMetadata } from "../../game-builder/interfaces/game-metadata.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IDungeonState } from "@game-logic/gameplay/modules/dungeon/mixins/dungeon-state/dungeon-state.interface";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";

export type IDungeonGameplayState = IDungeonState & IGameMetadata & IPersistableGameState & INarrativeMedium & IUiMedium & ISceneMediumDeclaration