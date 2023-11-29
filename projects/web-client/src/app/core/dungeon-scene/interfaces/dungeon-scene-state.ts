import { IBoardCoordinates, IBoardObjectRotation } from "@game-logic/lib/features/board/board.interface";
import { ActorType } from "@game-logic/lib/features/actors/actors.constants";

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
}


export interface ISceneObjectState {
  id: string;
  isHighlighted: boolean,
  isHovered: boolean,
  isSelected: boolean,
  isPreview: boolean,
  position: IBoardCoordinates,
  rotation: IBoardObjectRotation,
  actorType: ActorType
}