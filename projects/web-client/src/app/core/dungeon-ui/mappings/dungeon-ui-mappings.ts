import { DungeonState } from "@game-logic/lib/game/dungeon-state";
import { spellsAndAbilities } from "../../adventure/constants/data";
import { IDungeonActivityLogState } from "../interfaces/dungeon-activity-log-entry";
import { IDungeonUiState } from "../interfaces/dungeon-ui-state";


export function mapDungeonStateToUiState(d: DungeonState): IDungeonUiState {
  return {
    activities: d.heroPreparedSpellAndAbilityIds
      .map(id => Object.assign(spellsAndAbilities[id], { isHighlighted: false, isDisabled: false, isSelected: false })),
    activityConfirmationRequired: false,
    activityIdToConfirm: undefined,
    activityConfirmed: false,
    activitySelectionRequired: false,
    confirmationPossible: false
  }
}

export function mapDungeonStateToActivityLog(d: DungeonState): IDungeonActivityLogState {
  return {
    entries: []
  }
}