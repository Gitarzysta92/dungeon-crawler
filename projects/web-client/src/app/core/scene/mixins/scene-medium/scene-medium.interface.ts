import { IActor } from "@3d-scene/lib/actors/actor.interface";
import { IMovable } from "@3d-scene/lib/behaviors/movable/movable.interface";
import { IRotatable } from "@3d-scene/lib/behaviors/rotatable/rotatable.interface";
import { ISceneComposerDefinition, ISceneComposerMedium } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { IMixin } from "@game-logic/lib/infrastructure/mixin/mixin.interface";

import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { Camera, Renderer, Vector2 } from "three";

export interface ISceneMedium<T = ISceneComposerDefinition<unknown>> extends ISceneMediumDeclaration<T>, ISceneComposerMedium {
  id: string,
  auxId: string,
  toRemove?: boolean,
  isSceneObjectsCreated: boolean,
  get associatedActors(): Array<IActor & Partial<IMovable> & Partial<IRotatable>>;
  getAssociatedActors(): Array<IActor & Partial<IMovable> & Partial<IRotatable>>;
  getComputedDeclarations(): Array<ISceneComposerDefinition<unknown> & { auxId: string, auxCoords: string }>;
  createSceneObjects(): ISceneComposerDefinition<unknown>[];
  removeSceneObjects(): Promise<void>;
  updateScenePosition(): Promise<void>;
  updateScreenCoords(): void;
  position?: ICubeCoordinates;
  rotation?: 0 | 1 | 3 | 2 | 4 | 5;
  viewportCoords: Vector2 
}


export interface ISceneMediumDeclaration<T = ISceneComposerDefinition<unknown>> extends IMixin {
  scene: { composerDeclarations: T[] },
  isSceneMedium: true;
  position?: ICubeCoordinates;
  rotation?: 0 | 1 | 3 | 2 | 4 | 5;
}
