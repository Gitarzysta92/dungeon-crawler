
import { Dictionary } from "@game-logic/lib/infrastructure/extensions/types";
import { ISceneField, ISceneToken } from "../../../core/scene/interfaces/scene.interface";
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { IBoardField } from "@game-logic/lib/modules/board/entities/board-field/board-field.interface";
import { IBoardAssignment, IBoardObject } from "@game-logic/lib/modules/board/entities/board-object/board-object.interface";


export interface IDevBoardState<F extends IDevFieldState, T extends IDevTileState> {
  fields: Dictionary<string, F>,
  objects: Dictionary<string, T>
}

export type IDevFieldState = ISceneField & { position: ICubeCoordinates } & IBoardField;
export type IDevTileState = ISceneToken & IBoardObject & IBoardAssignment;