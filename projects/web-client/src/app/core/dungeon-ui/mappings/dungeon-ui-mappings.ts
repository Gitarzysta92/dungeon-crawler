import { DungeonState } from "@game-logic/lib/states/dungeon-state";
import { IDungeonActivityLogState } from "../interfaces/dungeon-activity-log-entry";
import { IUiActor } from "../interfaces/dungeon-ui-state";
import { ClaimTreasureUiActivity, LeaveDungeonUiActivity, InteractCharacterUiActivity} from "../services/ui-interaction/ui-activity";
import { IDungeonUiActivity } from "../interfaces/dungeon-ui-activity";
import { IBoardActorDataFeedEntity, ICharacterDataFeedEntity, IDungeonExitDataFeedEntity, ITreasureDataFeedEntity } from "../../data-feed/interfaces/data-feed-actor-entity.interface";
import { ActorType } from "@game-logic/lib/features/actors/actors.constants";
import { IActor } from "@game-logic/lib/features/actors/actors.interface";


export function mapActorToUiActor(a: IActor, actorData: IBoardActorDataFeedEntity): IUiActor {
  if (!actorData) {
    return { ...a} as unknown as IUiActor;
  }
  return Object.assign(actorData, a) as unknown as IUiActor;
}


export function mapDungeonStateToActivityLog(d: DungeonState): IDungeonActivityLogState {
  return {
    entries: []
  }
}

export function mapActorToUiActivity(actor: IActor, actorData: IBoardActorDataFeedEntity): IDungeonUiActivity {
  let activity;

  if (actor.actorType === ActorType.DungeonExit) {
    activity = new LeaveDungeonUiActivity(actor as IDungeonExitDataFeedEntity);
  }

  if (actor.actorType === ActorType.Treasure) {
    activity = new ClaimTreasureUiActivity(actor as ITreasureDataFeedEntity);
  }

  if (actor.actorType === ActorType.Character) {
    activity = new InteractCharacterUiActivity(actor as ICharacterDataFeedEntity)
  }

  return activity;
}