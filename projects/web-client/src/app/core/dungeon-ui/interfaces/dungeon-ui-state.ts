import { IDungeonUiActivity } from "./dungeon-ui-activity";

export interface IDungeonUiState {
  activityConfirmationRequired: boolean;
  activityIdToConfirmation: string | undefined;
  activityConfirmed: boolean;
  activities: IDungeonUiActivity[];
  activitySelectionRequired: boolean;
  confirmationPossible: boolean;
  activityIdToEarlyConfirm: string | undefined;
  activityEarlyConfirmationPossible: boolean,
  activityEarlyConfirmed: boolean;
}