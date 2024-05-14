import { ROTATION_ANGLES } from "@3d-scene/lib/behaviors/rotatable/rotatable.constants";
import { IRawVector3 } from "@3d-scene/lib/extensions/types/raw-vector3";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { IMixin } from "@game-logic/lib/base/mixin/mixin.interface";

export interface ISceneMedium<T = ISceneComposerDefinition<unknown>> extends ISceneMediumDeclaration<T> {
  id: string,
  auxId: string,
  isHighlighted: boolean,
  isSelected: boolean,
  isHovered: boolean,
  isPreview: boolean,
  toRemove?: boolean,
  getComposerDeclarations(): ISceneComposerDefinition<unknown>[];
  updateBehavior(): Promise<void>
}


export interface ISceneMediumDeclaration<T = ISceneComposerDefinition<unknown>> extends IMixin {
  scene: {
    composerDeclarations: T[]
  },
  isSceneMedium: true;
}
