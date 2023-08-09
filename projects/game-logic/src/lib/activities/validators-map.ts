import { ActivityName } from "./constants/activity-name";
import { ActivityValidator } from "./interfaces/activity-validator.interface";
import { isPlayerHasTilesInPlayablesSlot, isPlayerDeployingTileOfGivenType } from "../features/adventure/army-validators";
import { TileType } from "../features/adventure/constants/tile-type.enum";
import { isPlayerDiscaredTilesDownToRequiredAmount, isPlayerHasGivenNumberOfTilesInPlayables, isPlayerKeepingTilesUpToAllowedMaximum } from "../game/validators/validators";
import { isPlayerHasActionInActionsSlot } from "../features/action/validators/validators";
import { deployTile } from "./directives/edit-stats";
import { IActivityWithPayload } from "./interfaces/activity.interface";

export const validatorsMap: { [key: string]: ActivityValidator; } = {
  [ActivityName.Initialization+ActivityName.StartTurn]: () => true,
  [ActivityName.StartTurn + ActivityName.DrawTiles]: () => true,
  [ActivityName.StartTurn + ActivityName.DeployTile]: (state, activity: IActivityWithPayload<typeof deployTile>) =>
    isPlayerDeployingTileOfGivenType(activity.payload?.tile!, [TileType.Headquarter]) &&
    isPlayerHasGivenNumberOfTilesInPlayables(state.actualPlayer, 1),
  
  [ActivityName.DrawTiles + ActivityName.DiscardTiles]: (state, activity) =>
    isPlayerDiscaredTilesDownToRequiredAmount(state.actualPlayer, activity.payload.tilesToDiscard),
  
  [ActivityName.DiscardTiles + ActivityName.DeployTile]: (state, activity) =>
    isPlayerDeployingTileOfGivenType(activity.payload.tile, [TileType.Unit, TileType.Surface, TileType.Headquarter]) &&
    isPlayerHasTilesInPlayablesSlot(state.actualPlayer, activity.payload.tile),
  
  [ActivityName.DiscardTiles + ActivityName.DisposeActionTile]: (state, activity) => 
    isPlayerDeployingTileOfGivenType(activity.payload.tile, [TileType.Action]) &&
    isPlayerHasTilesInPlayablesSlot(state.actualPlayer, activity.payload.tile),
  
  [ActivityName.DiscardTiles + ActivityName.DisposeAction]: (state, activity) => 
    isPlayerHasActionInActionsSlot(state.actualPlayer, activity.payload.action),
  
  [ActivityName.DiscardTiles + ActivityName.FinishTurn]: (state) =>
    isPlayerKeepingTilesUpToAllowedMaximum(state.actualPlayer),
  
  [ActivityName.DeployTile + ActivityName.DeployTile]: (state, activity) => 
    isPlayerDeployingTileOfGivenType(activity.payload.tile, [TileType.Unit, TileType.Surface, TileType.Headquarter]) &&
    isPlayerHasTilesInPlayablesSlot(state.actualPlayer, activity.payload.tile),
  
  [ActivityName.DeployTile + ActivityName.DisposeActionTile]: (state, activity) => 
    isPlayerDeployingTileOfGivenType(activity.payload.tile, [TileType.Action]) &&
    isPlayerHasTilesInPlayablesSlot(state.actualPlayer, activity.payload.tile),
  
  [ActivityName.DeployTile + ActivityName.DisposeAction]: (state, activity) =>
    isPlayerHasActionInActionsSlot(state.actualPlayer, activity.payload.action),
  
  [ActivityName.DeployTile+ActivityName.Agreement]: () => true,
  [ActivityName.DeployTile+ActivityName.FinishTurn]: (state) => isPlayerKeepingTilesUpToAllowedMaximum(state.actualPlayer),
  [ActivityName.DisposeActionTile+ActivityName.DeployTile]: () => true,
  [ActivityName.DisposeActionTile+ActivityName.DisposeActionTile]: () => true,
  [ActivityName.DisposeActionTile+ActivityName.DisposeAction]: () => true,
  [ActivityName.DisposeActionTile+ActivityName.Agreement]: () => true,
  [ActivityName.DisposeActionTile+ActivityName.FinishTurn]: (state) => isPlayerKeepingTilesUpToAllowedMaximum(state.actualPlayer),
  [ActivityName.DisposeAction+ActivityName.DeployTile]: () => true,
  [ActivityName.DisposeAction+ActivityName.DisposeActionTile]: () => true,
  [ActivityName.DisposeAction+ActivityName.DisposeAction]: () => true,
  [ActivityName.DisposeAction+ActivityName.Agreement]: () => true,
  [ActivityName.DisposeAction+ActivityName.FinishTurn]: (state) => isPlayerKeepingTilesUpToAllowedMaximum(state.actualPlayer),
  [ActivityName.Agreement+ActivityName.AgreementResponse]: () => true,
  [ActivityName.AgreementResponse+ActivityName.DeployTile]: () => true,
  [ActivityName.AgreementResponse+ActivityName.DisposeActionTile]: () => true,
  [ActivityName.AgreementResponse+ActivityName.DisposeAction]: () => true,
  [ActivityName.AgreementResponse+ActivityName.FinishTurn]: () => true,
  [ActivityName.FinishTurn+ActivityName.StartTurn]: () => true,
};

