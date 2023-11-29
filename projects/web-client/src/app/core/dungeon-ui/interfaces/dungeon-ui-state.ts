import { IBasicStats, ISecondaryStats } from "@game-logic/lib/features/actors/actors.interface";
import { IDungeonUiActivity } from "./dungeon-ui-activity";
import { IBoardObject } from "@game-logic/lib/features/board/board.interface";

export interface IDungeonUiState {
  activityConfirmationRequired: boolean;
  activityIdToConfirmation: string | undefined;
  activityConfirmed: boolean;
  activitySelectionRequired: boolean;
  confirmationPossible: boolean;
  activityIdToEarlyConfirm: string | undefined;
  activityEarlyConfirmationPossible: boolean,
  activityEarlyConfirmed: boolean;
  activities: IDungeonUiActivity[];
  actors: IUiActor[]
}


export interface IUiActor extends IBasicStats, Partial<ISecondaryStats>, IBoardObject {
  actorId: string;
}