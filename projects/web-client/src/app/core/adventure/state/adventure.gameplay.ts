import { AdventureGameplayLogicState } from "@game-logic/gameplay/state/adventure/adventure-gameplay";
import { IDungeonUiState } from "../../game-ui/states/dungeon-ui-state.interface";
import { IHero } from "@game-logic/gameplay/modules/heroes/entities/hero/hero.interface";

export class AdventureGameplay extends AdventureGameplayLogicState implements IDungeonUiState {
  activityConfirmationRequired: boolean;
  activityIdToConfirmation: string;
  activityConfirmed: boolean;
  activitySelectionRequired: boolean;
  confirmationPossible: boolean;
  activityIdToEarlyConfirm: string;
  activityEarlyConfirmationPossible: boolean;
  activityEarlyConfirmed: boolean;
  selectedHeroId: string;
  selectedActivityId: string;
  
  getSelectedHero(): IHero {
    throw new Error("Method not implemented.");
  }
  
}