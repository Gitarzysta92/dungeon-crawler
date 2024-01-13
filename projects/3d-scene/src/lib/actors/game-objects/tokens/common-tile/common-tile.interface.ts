import { commonTileComposerDefinitionName } from "./common-tile.constants";
import { ITokenComposerDefinition, ITokenDefinition } from "../common/token.interface";
import { ROTATION_ANGLES } from "../../../../behaviors/rotatable/rotatable.constants";
import { IAssetDefinition } from "../../../../assets/assets.interface";

export interface ICommonTileComposerDefinition extends
  ICommonTileCreationDefinition,
  ITokenComposerDefinition<typeof commonTileComposerDefinitionName> {
  initialAnimationDelay: number;
}

export interface ICommonTileCreationDefinition extends
  ITokenDefinition<typeof commonTileComposerDefinitionName>,
  ICommonTileDefinition {
}

export interface ICommonTileDefinition extends
  ITokenDefinition<typeof commonTileComposerDefinitionName> {
  primaryColor: number;
  jawelColor: number;
  texture: IAssetDefinition;
  outlets: (keyof typeof ROTATION_ANGLES)[];
}