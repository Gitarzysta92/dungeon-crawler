import { MODIFY_POSITION_BY_PATH_ACTION } from "./aspects/actions/modify-position-by-path.action"
import { MOVE_POSITION_RELATIVE } from "./aspects/actions/move-position-relative-to.action"
import { PLACE_ON_BOARD_ACTION } from "./aspects/actions/place-on-board.action"
import { BOARD_SELECTOR } from "./aspects/selectors/board.selector"

export {
 BOARD_SELECTOR as BOARD_SELECTOR_IDENTIFIER, MODIFY_POSITION_BY_PATH_ACTION as MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER, MOVE_POSITION_RELATIVE as MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER, PLACE_ON_BOARD_ACTION as PLACE_ON_BOARD_ACTION_HANDLER_IDENTIFIER,
}

export const FIELD_DATA_TYPE = "FIELD_DATA_TYPE";
export const PATH_DATA_TYPE = "PATH_DATA_TYPE";
export const ROTATION_DATA_TYPE = "ROTATION_DATA_TYPE";