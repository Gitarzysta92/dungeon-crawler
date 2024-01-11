import { IFieldComposerDefinition } from "@3d-scene/lib/actors/game-objects/fields/common/field.interface";
import { ITokenComposerDefinition } from "@3d-scene/lib/actors/game-objects/tokens/common/token.interface";
import { IBoardObjectRotation } from "@game-logic/lib/features/board/board.interface";

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

export interface ISceneToken extends ITokenComposerDefinition<unknown>  {
  id: string;
  isHighlighted: boolean,
  isHovered: boolean,
  isSelected: boolean,
  isPreview: boolean,
  rotation: IBoardObjectRotation
}