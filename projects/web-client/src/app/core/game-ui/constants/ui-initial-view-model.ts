import { IDungeonUiState } from "../states/dungeon-ui-state.factory";

export const uiInitialViewModel: IDungeonUiState = {
  activityConfirmationRequired: false,
  activityIdToConfirmation: undefined,
  activityConfirmed: false,
  activities: [],
  activitySelectionRequired: false,
  confirmationPossible: false,
  activityEarlyConfirmationPossible: false,
  activityEarlyConfirmed: false,
  activityIdToEarlyConfirm: undefined,
  actors: [],
  hero: undefined
}