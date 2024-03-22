import { Dictionary } from "@game-logic/lib/extensions/types";
import { ISceneField, ISceneToken } from "../../dungeon-scene/interfaces/dungeon-scene-state";
import { IBoardCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { IBoardField } from "@game-logic/lib/modules/board/entities/board-field/board-field.interface";
import { IBoardAssignment, IBoardObject } from "@game-logic/lib/modules/board/entities/board-object/board-object.interface";


export interface IDevBoardState<F extends IDevFieldState, T extends IDevTileState> {
  fields: Dictionary<string, F>,
  objects: Dictionary<string, T>
}

export type IDevFieldState = ISceneField & { position: IBoardCoordinates } & IBoardField;
export type IDevTileState = ISceneToken & IBoardObject & IBoardAssignment;