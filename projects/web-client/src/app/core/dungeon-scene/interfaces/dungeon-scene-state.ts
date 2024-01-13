<<<<<<< HEAD
import { IAassignedBoardObject } from "@game-logic/lib/features/board/board.interface";
import { Hero } from "@game-logic/lib/features/hero/hero";
=======
import { IFieldComposerDefinition } from "@3d-scene/lib/actors/game-objects/fields/common/field.interface";
import { ITokenComposerDefinition } from "@3d-scene/lib/actors/game-objects/tokens/common/token.interface";
import { IBoardObjectRotation } from "@game-logic/lib/features/board/board.interface";
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150

export interface IDungeonSceneState {
  fields: {
    [key: string]: ISceneField;
  },
  tokens: {
    [key: string]: ISceneToken;
  }
}

export interface ISceneField extends IFieldComposerDefinition<unknown> {
  id: string;
  isHighlighted: boolean,
  isHighlightedRange: boolean,
  isHovered: boolean,
  isSelected: boolean,
}

<<<<<<< HEAD

export interface ISceneObjectState extends IAassignedBoardObject {
=======
export interface ISceneToken extends ITokenComposerDefinition<unknown>  {
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150
  id: string;
  isHighlighted: boolean,
  isHovered: boolean,
  isSelected: boolean,
  isPreview: boolean,
<<<<<<< HEAD
  sourceActorId: string;
=======
  rotation: IBoardObjectRotation
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150
}