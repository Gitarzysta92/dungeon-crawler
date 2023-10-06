export interface IDungeonUiState {
  activityConfirmationRequired: boolean;
  activityIdToConfirm: string | undefined;
  activityConfirmed: boolean;
  activities: { id: string, isHighlighted: boolean, isDisabled: boolean, isSelected: boolean; }[];
  activitySelectionRequired: boolean;
  confirmationPossible: boolean;
}