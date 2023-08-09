
import { disposeAction } from "./directives/dispose-action"
import { disposeActionTile } from "./directives/dispose-action-tile"
import { drawTiles } from "./directives/draw-tiles"
import { finishTurn } from "./directives/finish-turn"
import { leaveGame } from "./directives/leave-game"
import { startTurn } from "./directives/start-turn"

export const directivesMap = {
  [ActivityName.StartTurn]: startTurn,
  [ActivityName.Surrender]: finishTurn,

  [ActivityName.DrawTiles]: drawTiles,
  [ActivityName.DiscardTiles]: discardTiles,

  [ActivityName.DisposeAction]: disposeAction,
  [ActivityName.DisposeActionTile]: disposeActionTile,
  [ActivityName.DeployTile]: deployTile,

  [ActivityName.Surrender]: leaveGame,
}


