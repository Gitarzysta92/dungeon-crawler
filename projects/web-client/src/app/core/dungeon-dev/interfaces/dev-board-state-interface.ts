import { Dictionary } from "@game-logic/lib/extensions/types";
import { ISceneFieldState, ISceneObjectState } from "../../dungeon-scene/interfaces/dungeon-scene-state";
import { IAassignedBoardObject, IBoardCoordinates, IField } from "@game-logic/lib/features/board/board.interface";
import { IDataFeedEntityBase } from "../../data-feed/interfaces/data-feed-entity.interface";
import { ISceneFieldDeclaration } from "@3d-scene/scene/interfaces/declarations/field-declaration";
import { ISceneObjectDeclaration } from "@3d-scene/scene/interfaces/declarations/scene-object-declaration";
import { MapVectorToRawVector } from "@3d-scene/scene/types/map-vector-to-raw-vector";

export interface IDevBoardState<F extends IDevBoardFieldState, T extends IDevBoardObjectState> {
  fields: Dictionary<string, F>,
  objects: Dictionary<string, T>
}

export type IDevBoardFieldState = ISceneFieldState & { position: IBoardCoordinates } & IField;
export type IDevBoardObjectState = ISceneObjectState & IAassignedBoardObject;


export type IDevField = IDataFeedEntityBase & MapVectorToRawVector<ISceneFieldDeclaration> & IDevBoardFieldState;
export type IDevTile = IDataFeedEntityBase & MapVectorToRawVector<ISceneObjectDeclaration> & IDevBoardObjectState;