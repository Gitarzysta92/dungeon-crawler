
import { ITokenComposerDefinition, ITokenDefinition } from "../common/token.interface";
import { ROTATION_ANGLES } from "../../../../behaviors/rotatable/rotatable.constants";
import { IAssetDefinition } from "../../../../assets/assets.interface";
import { plainTileComposerDefinitionName } from "./plain-tile.constants";

export interface IPlainTileComposerDefinition extends
  IPlainTileCreationDefinition,
  ITokenComposerDefinition<typeof plainTileComposerDefinitionName> {
  initialAnimationDelay: number;
}

export interface IPlainTileCreationDefinition extends
  ITokenDefinition<typeof plainTileComposerDefinitionName>,
  IPlainTileDefinition {
}

export interface IPlainTileDefinition extends
  ITokenDefinition<typeof plainTileComposerDefinitionName> {
  primaryColor: number;
  outlineColor: number;
  texture: IAssetDefinition;
  outlets: (keyof typeof ROTATION_ANGLES)[];
}