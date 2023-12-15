import { IBasicStats, ISecondaryStats } from "@game-logic/lib/features/actors/actors.interface";
import { IDungeonUiActivity } from "./dungeon-ui-activity";
import { IAassignedBoardObject } from "@game-logic/lib/features/board/board.interface";
import { Hero } from "@game-logic/lib/features/hero/hero";

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
  actors: IUiActor[];
  hero: Hero;
}


export interface IUiActor extends IBasicStats, Partial<ISecondaryStats>, IAassignedBoardObject {
  actorId: string;
}