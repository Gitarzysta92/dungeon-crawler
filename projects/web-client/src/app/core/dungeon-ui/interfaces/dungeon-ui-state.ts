import { IDungeonUiActivity } from "./dungeon-ui-activity";

export interface IDungeonUiState {
  activityConfirmationRequired: boolean;
  activityIdToConfirm: string | undefined;
  activityConfirmed: boolean;
  activities: IDungeonUiActivity[];
  activitySelectionRequired: boolean;
  confirmationPossible: boolean;
}