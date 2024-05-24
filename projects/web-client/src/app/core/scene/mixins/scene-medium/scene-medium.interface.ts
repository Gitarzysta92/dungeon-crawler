import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { IMixin } from "@game-logic/lib/infrastructure/mixin/mixin.interface";

import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { Camera, Renderer } from "three";

export interface ISceneMedium<T = ISceneComposerDefinition<unknown>> extends ISceneMediumDeclaration<T> {
  id: string,
  auxId: string,
  toRemove?: boolean,
  isSceneObjectsCreated: boolean,
  getComputedDeclarations(): Array<ISceneComposerDefinition<unknown> & { auxId: string, auxCoords: string }>;
  createSceneObjects(): ISceneComposerDefinition<unknown>[];
  removeSceneObjects(): Promise<void>;
  updateScenePosition(): Promise<void>;
  updateViewportCoords(camera: Camera, renderer: Renderer): void;
  position?: ICubeCoordinates;
  rotation?: 0 | 1 | 3 | 2 | 4 | 5;
}


export interface ISceneMediumDeclaration<T = ISceneComposerDefinition<unknown>> extends IMixin {
  scene: { composerDeclarations: T[] },
  isSceneMedium: true;
  position?: ICubeCoordinates;
  rotation?: 0 | 1 | 3 | 2 | 4 | 5;
}
