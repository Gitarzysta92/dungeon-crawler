import { IBoardCoordinates, IBoardObjectRotation } from "@game-logic/lib/features/board/board.interface"
import { MapVectorToRawVector } from "@3d-scene/scene/types/map-vector-to-raw-vector"
import { ISceneFieldDeclaration } from "@3d-scene/scene/interfaces/declarations/field-declaration"
import { IVisualSceneTileDeclaration } from "../../data-feed/interfaces/data-feed-entity.interface"

export interface IDungeonSceneState {
  board: {
    fields: {
      [key: string]: ISceneFieldState
    },
    objects: {
      [key: string]: ISceneObjectState
    }
  }
}



export interface ISceneFieldState {
  isHighlighted: boolean,
  isHighlightedRange: boolean,
  isHovered: boolean,
  isSelected: boolean,
  visualData: MapVectorToRawVector<ISceneFieldDeclaration>
}


export interface ISceneObjectState {
  id: string;
  isHighlighted: boolean,
  isHovered: boolean,
  isSelected: boolean,
  position: IBoardCoordinates,
  rotation: IBoardObjectRotation,
  visualData: IVisualSceneTileDeclaration
}