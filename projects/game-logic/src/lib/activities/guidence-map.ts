import { TileType } from "../features/adventure/constants/tile-type.enum";
import { isPlayerHasGivenTileTypesInPlayablesSlot } from "../features/adventure/army-validators";
import { isPlayerHasActionsToPlay } from "../features/action/validators/validators";
import { Player } from "../game/interfaces/player";
import { isAgreementHasBeenArranged, isAgreementHasBeenEstablished, isPlayerHasGivenNumberOfTilesInPlayables, isPlayerKeepingTilesUpToAllowedMaximum } from "../game/validators/validators";
import { IGameState } from "../state-dispatcher/interfaces/game-state.interface";
import { ActivityName } from "./constants/activity-name";
import { ActivityGuidence } from "./interfaces/activity-guidence.interface";
import { isBattleWasStarted } from "../features/dungeon/battle-validators";

export const guidenceMap: { [key: string]: ActivityGuidence; } = {
  [ActivityName.Initialization + ActivityName.StartTurn]: () => true,
  [ActivityName.StartTurn + ActivityName.DrawTiles]: () => true,

  [ActivityName.DrawTiles + ActivityName.DiscardTiles]: (state) =>
    isPlayerKeepingTilesUpToAllowedMaximum(state.actualPlayer) &&
    !isPlayerHasGivenTileTypesInPlayablesSlot(state.actualPlayer, [TileType.Headquarter]),
  
  [ActivityName.DrawTiles + ActivityName.DeployTile]: (state) =>
    isPlayerHasGivenNumberOfTilesInPlayables(state.actualPlayer, 1) &&
    isPlayerHasGivenTileTypesInPlayablesSlot(state.actualPlayer, [TileType.Headquarter]),

  [ActivityName.DiscardTiles + ActivityName.DeployTile]: (state) =>
    isPlayerHasGivenTileTypesInPlayablesSlot(state.actualPlayer, [TileType.Unit, TileType.Surface, TileType.Headquarter]),
  
  [ActivityName.DiscardTiles + ActivityName.DisposeActionTile]: (state) =>
    isPlayerHasGivenTileTypesInPlayablesSlot(state.actualPlayer, [TileType.Action]),
  
  [ActivityName.DiscardTiles + ActivityName.DisposeAction]: (state) =>
    isPlayerHasActionsToPlay(state.actualPlayer),
  
  [ActivityName.DiscardTiles + ActivityName.FinishTurn]: () => true,

  [ActivityName.DeployTile + ActivityName.DeployTile]: (state) =>
    isPlayerHasGivenTileTypesInPlayablesSlot(state.actualPlayer, [TileType.Unit, TileType.Surface, TileType.Headquarter]),
  
  [ActivityName.DeployTile + ActivityName.DisposeActionTile]: (state) =>
    isPlayerHasGivenTileTypesInPlayablesSlot(state.actualPlayer, [TileType.Action]),
  
  [ActivityName.DeployTile + ActivityName.DisposeAction]: (state) =>
    isPlayerHasActionsToPlay(state.actualPlayer),
  
  [ActivityName.DeployTile + ActivityName.Agreement]: (state) =>
    isAgreementHasBeenArranged(state.aggreement),
  
  [ActivityName.DeployTile + ActivityName.FinishTurn]: () => true,
  
  [ActivityName.DisposeActionTile + ActivityName.DeployTile]: (state) =>
    !isBattleWasStarted(state.battles) &&
    isPlayerHasGivenTileTypesInPlayablesSlot(state.actualPlayer, [TileType.Unit, TileType.Surface, TileType.Headquarter]),
  
  [ActivityName.DisposeActionTile + ActivityName.DisposeActionTile]: (state) =>
    !isBattleWasStarted(state.battles) &&
    isPlayerHasGivenTileTypesInPlayablesSlot(state.actualPlayer, [TileType.Action]),
  
  [ActivityName.DisposeActionTile + ActivityName.DisposeAction]: (state) =>
    !isBattleWasStarted(state.battles) &&
    isPlayerHasActionsToPlay(state.actualPlayer),
  
  [ActivityName.DisposeActionTile + ActivityName.Agreement]: (state) =>
    !isBattleWasStarted(state.battles) &&
    isAgreementHasBeenArranged(state.aggreement),
  
  [ActivityName.DisposeActionTile + ActivityName.FinishTurn]: () => true,
  
  [ActivityName.DisposeAction + ActivityName.DeployTile]: (state) =>
    !isBattleWasStarted(state.battles) &&
    isPlayerHasGivenTileTypesInPlayablesSlot(state.actualPlayer, [TileType.Unit, TileType.Surface, TileType.Headquarter]),
  
  [ActivityName.DisposeAction + ActivityName.DisposeActionTile]: (state) =>
    !isBattleWasStarted(state.battles) &&
    isPlayerHasGivenTileTypesInPlayablesSlot(state.actualPlayer, [TileType.Action]),
  
  [ActivityName.DisposeAction + ActivityName.DisposeAction]: (state) =>
    !isBattleWasStarted(state.battles) &&
    isPlayerHasActionsToPlay(state.actualPlayer),
  
  [ActivityName.DisposeAction + ActivityName.Agreement]: (state) =>
    !isBattleWasStarted(state.battles) &&
    isAgreementHasBeenArranged(state.aggreement),
  
  [ActivityName.DisposeAction + ActivityName.FinishTurn]: () => true,
  
  [ActivityName.Agreement+ActivityName.AgreementResponse]: () => true,
  [ActivityName.AgreementResponse+ActivityName.DeployTile]: (state) => isPlayerHasGivenTileTypesInPlayablesSlot(state.actualPlayer, [TileType.Unit, TileType.Surface, TileType.Headquarter]),
  [ActivityName.AgreementResponse+ActivityName.DisposeActionTile]: (state) => isPlayerHasGivenTileTypesInPlayablesSlot(state.actualPlayer, [TileType.Action]),
  [ActivityName.AgreementResponse+ActivityName.DisposeAction]: (state) => isPlayerHasActionsToPlay(state.actualPlayer),
  [ActivityName.AgreementResponse+ActivityName.FinishTurn]: (state) => isAgreementHasBeenEstablished(state.aggreement),
  [ActivityName.FinishTurn+ActivityName.StartTurn]: () => true,
};

export function getPossibileActivities(state: IGameState, authority: Player): ActivityName[] {
  return Object.values(ActivityName).filter(an => guidenceMap[state.activityStack[0].name + an]?.call(null, state, authority));
}




// export function getTurnActivitiesGuidence(gameState: IGameState): ActivityName[] {
//   yield [ActivityName.StartTurn];
//   gameState = yield [ActivityName.DrawTiles];
//   gameState = yield [ActivityName.DiscardTiles];

//   let isPlayerHasAnyTileOrActionLeft = false;
//   let isBattleStarted = false;
//   do {
//     isPlayerHasAnyTileOrActionLeft = gameState.actualPlayer.playablesSlot.length > 0;
//     isBattleStarted = gameState.name === GameStateName.Battle &&
//       gameState.activityStack[0].name === ActivityName.DisposeActionTile &&
//       isBattleStartedValidator(gameState.activityStack)

//     const availableActivities = []; 
//     const canDisposeAction = gameState.actualPlayer.actionsSlot.length > 0;
//     if (canDisposeAction) {
//       availableActivities.push(ActivityName.DisposeAction);
//     }

//     const playerArmyId = gameState.actualPlayer.data?.armyId;
//     const tiles = gameState.actualPlayer.playablesSlot.map(tileId => ArmyHelper.getTile(playerArmyId!, tileId))
//     const canDisposeActionTile = tiles.find(t => t.type === TileType.Action)
//     if (canDisposeActionTile) {
//       availableActivities.push(ActivityName.DisposeAction);
//     }

//     const canDeployTile = tiles.find(t => t.type !== TileType.Action)
//     if (canDeployTile) {
//       availableActivities.push(ActivityName.DeployTile);
//     }
    
//     availableActivities.push(ActivityName.Surrender);
//     availableActivities.push(ActivityName.MoveTile)
//     gameState = yield availableActivities;

//   } while (isPlayerHasAnyTileOrActionLeft && !isBattleStarted);

//   return [ActivityName.FinishTurn];
// }
