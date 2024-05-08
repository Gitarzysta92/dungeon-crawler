import { DungeonGameplayLogicState } from "@game-logic/gameplay/state/dungeon/dungeon-gameplay";
import { IDungeonUiState } from "../../game-ui/states/dungeon-ui-state.interface";
import { IHero } from "@game-logic/gameplay/modules/heroes/entities/hero/hero.interface";
import { IDataContainer } from "../../game-data/interface/data-container.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IVisualMedium, IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { Player } from "../../../../../../game-logic/src/lib/modules/turn-based-gameplay/entities/turn-based-player/turn-based-player";
import { Guid } from "@game-logic/lib/extensions/types";

export class DungeonGameplayState extends DungeonGameplayLogicState
  implements IDataContainer<IDungeonUiState, INarrationMedium, IVisualMedium<IVisualUiData, any>> {
  isMixin: true;
  
  selectedHeroId: Guid;
  get selectedHero() { return this.entityService.getEntity(e => e.id === this.selectedHeroId) };
  set selectHero(s: IHero) { this.selectedHeroId = s.id }

  selectedActivityId: Guid;
  get selectedActivity() { return {} as any }

  narrative: { name: string; description: string; };
  isNarrationMedium: true;
  tags?: string[];
  toRemove?: boolean;
  isEntity: true;
  visual: { ui?: IVisualUiData; scene?: any; };
  isVisualMedium: true;

  getSelectedHero(): IHero {
    throw new Error("Method not implemented.");
  }

  getCurrentPlayer(): Player {
    throw new Error('Method not implemented.');
  }
  
}