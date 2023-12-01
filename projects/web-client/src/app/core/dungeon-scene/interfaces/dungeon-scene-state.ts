import { IBoardCoordinates, IBoardObjectRotation } from "@game-logic/lib/features/board/board.interface";
import { ActorType } from "@game-logic/lib/features/actors/actors.constants";
import { Hero } from "@game-logic/lib/features/hero/hero";

export interface IDungeonSceneState {
  board: {
    fields: {
      [key: string]: ISceneFieldState
    },
    objects: {
      [key: string]: ISceneObjectState
    }
  },
  hero?: Hero & { visualScene: any }
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