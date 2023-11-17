import { IDungeonUiState } from "../interfaces/dungeon-ui-state";

export const uiInitialViewModel: IDungeonUiState = {
  activityConfirmationRequired: false,
  activityIdToConfirmation: undefined,
  activityConfirmed: false,
  activities: [],
  activitySelectionRequired: false,
  confirmationPossible: false,
  activityEarlyConfirmationPossible: false,
  activityEarlyConfirmed: false,
  activityIdToEarlyConfirm: undefined
}