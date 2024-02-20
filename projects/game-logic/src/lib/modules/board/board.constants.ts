import { MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER } from "./aspects/actions/modify-position-by-path.action"
import { MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER } from "./aspects/actions/move-position-relative-to.action"
import { PLACE_ON_BOARD_ACTION_HANDLER_IDENTIFIER } from "./aspects/actions/place-on-board.action"
import { BOARD_FIELD_IDENTIFIER } from "./aspects/gatherers/board-field.gatherer"
import { PATH_IDENTIFIER } from "./aspects/gatherers/path.gatherer"
import { ROTATION_IDENTIFIER } from "./aspects/gatherers/rotation.gatherer"
import { BOARD_SELECTOR_IDENTIFIER } from "./aspects/selectors/board.selector"

export enum Side {
  Top = 0,
  TopRight = 1,
  BottomRight = 2,
  Bottom = 3,
  BottomLeft = 4,
  TopLeft = 5
}

export enum Size {
  Small = 0,
  Medium = 1,
  Huge = 2
}

export const SIZES = [
  Size.Small,
  Size.Medium,
  Size.Huge
]

export { 
  MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER,
  PLACE_ON_BOARD_ACTION_HANDLER_IDENTIFIER,
  MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER,
  BOARD_SELECTOR_IDENTIFIER,
  PATH_IDENTIFIER,
  ROTATION_IDENTIFIER,
  BOARD_FIELD_IDENTIFIER
}