import { IActor } from "@3d-scene/lib/actors/actor.interface";
import { IMovable } from "@3d-scene/lib/behaviors/movable/movable.interface";
import { IRotatable } from "@3d-scene/lib/behaviors/rotatable/rotatable.interface";
import { IRawVector3 } from "@3d-scene/lib/extensions/types/raw-vector3";
import { ISceneComposerDefinition, ISceneComposerMedium } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { IMixin } from "@game-logic/lib/infrastructure/mixin/mixin.interface";

import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { IAssetDeclaration } from "src/app/infrastructure/asset-loader/api";
import { Vector2 } from "three";

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
  updateSceneRotation(): Promise<void>;
  updateScreenCoords(offsetY?: number, offsetX?: number): void;
  createDummy(position?: ICubeCoordinates);
  position: ICubeCoordinates;
  scenePosition: IRawVector3;
  rotation?: 0 | 1 | 3 | 2 | 4 | 5;
  viewportCoords: Vector2 
}


export interface ISceneMediumDeclaration<T = ISceneComposerDefinition<unknown>> extends IMixin {
  scene: { composerDeclarations: Array<T & { definitionName?: string, texture?: IAssetDeclaration }> },
  isSceneMedium: true;
  position?: ICubeCoordinates;
  rotation?: 0 | 1 | 3 | 2 | 4 | 5;
}
