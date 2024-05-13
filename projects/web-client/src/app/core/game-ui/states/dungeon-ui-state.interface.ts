import { Guid } from "@game-logic/lib/extensions/types";
import { IHero } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";

export interface IDungeonUiState {
  selectedHeroId: Guid;
  selectedActivityId: Guid | undefined;
  getSelectedHero(): IHero
}

export interface IDungeonUiActivity {
  id: string,
  isHighlighted: boolean,
  isDisabled: boolean,
  isSelected: boolean;
  isContextual: boolean;
  isStatic: boolean;
}


// activityConfirmationRequired: boolean;
// activityIdToConfirmation: string | undefined;
// activityConfirmed: boolean;
// activitySelectionRequired: boolean;
// confirmationPossible: boolean;
// activityIdToEarlyConfirm: string | undefined;
// activityEarlyConfirmationPossible: boolean,
// activityEarlyConfirmed: boolean;