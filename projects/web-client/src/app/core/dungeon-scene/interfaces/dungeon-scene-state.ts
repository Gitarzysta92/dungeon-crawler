import { IBoardCoordinates, IBoardObjectRotation } from "@game-logic/lib/features/board/board.interface"

export interface IDungeonSceneState {
  board: {
    fields: {
      [key: string]: {
        isHighlighted: boolean,
        isHighlightedRange: boolean,
        isHovered: boolean,
        isSelected: boolean,
      }
    },
    actors: {
      [key: string]: {
        isHighlighted: boolean,
        isHovered: boolean,
        isSelected: boolean,
        position: IBoardCoordinates,
        rotation: IBoardObjectRotation
      }
    }
  }
}