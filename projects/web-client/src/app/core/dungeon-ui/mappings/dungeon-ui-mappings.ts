import { DungeonState } from "@game-logic/lib/game/dungeon-state";
import { ISpellOrAbilityDataFeedEntity } from "../../data-feed/interfaces/data-feed-effect-entity.interface";
import { IDungeonActivityLogState } from "../interfaces/dungeon-activity-log-entry";
import { IDungeonUiState } from "../interfaces/dungeon-ui-state";
import { CastEffectUiActivity, ClaimTreasureUiActivity, ExitDungeonUiActivity, FinishTurnUiActivity, InteractCharacterUiActivity} from "../services/ui-interaction/ui-activity";
import { IDungeonUiActivity } from "../interfaces/dungeon-ui-activity";
import { IBoardActorDataFeedEntity, ICharacterDataFeedEntity, IDungeonExitDataFeedEntity, ITreasureDataFeedEntity } from "../../data-feed/interfaces/data-feed-actor-entity.interface";
import { ActorType } from "@game-logic/lib/features/actors/actors.constants";


export function mapDungeonStateToUiState(d: DungeonState, spellsAndAbilities: ISpellOrAbilityDataFeedEntity[]): IDungeonUiState {
  const dungeon: IDungeonUiState = {
    activities: d.heroPreparedSpellAndAbilityIds
      .map(id => {
        const spellData = spellsAndAbilities.find(s => s.id === id);
        return new CastEffectUiActivity(spellData)
      }),
    activityConfirmationRequired: false,
    activityIdToConfirm: undefined,
    activityConfirmed: false,
    activitySelectionRequired: false,
    confirmationPossible: false,
  };
  dungeon.activities.push(new FinishTurnUiActivity());
  return dungeon;
}

export function mapDungeonStateToActivityLog(d: DungeonState): IDungeonActivityLogState {
  return {
    entries: []
  }
}

export function mapActorToUiActivity(actor: IBoardActorDataFeedEntity): IDungeonUiActivity {
  let activity;

  if (actor.actorType === ActorType.DungeonExit) {
    activity = new ExitDungeonUiActivity(actor as IDungeonExitDataFeedEntity);
  }

  if (actor.actorType === ActorType.Treasure) {
    activity = new ClaimTreasureUiActivity(actor as ITreasureDataFeedEntity);
  }

  if (actor.actorType === ActorType.Character) {
    activity = new InteractCharacterUiActivity(actor as ICharacterDataFeedEntity)
  }

  return activity;
}