import { IDungeonUiState } from "../interfaces/dungeon-ui-state";

export const uiInitialViewModel: IDungeonUiState = {
  activityConfirmationRequired: false,
  activityIdToConfirm: "",
  activityConfirmed: false,
  activities: [],
  activitySelectionRequired: false,
  confirmationPossible: false
}