import { IHero } from "@game-logic/lib/features/hero/hero.interface";
import { IDungeonSceneState } from "../../dungeon-scene/interfaces/dungeon-scene-state";
import { IDungeonUiState } from "../../dungeon-ui/interfaces/dungeon-ui-state";

export interface IDungeonViewModel extends IDungeonSceneState, IDungeonUiState {
  hero: IHero,
  isHeroTurn: boolean,
}