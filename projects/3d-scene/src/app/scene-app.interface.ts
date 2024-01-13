import { Observable } from "rxjs";
import { IRendererConfig } from "../lib/core/renderer.interface";
import { ISceneConfig } from "../lib/core/scene-wrapper.interface";
import { IAssetsProvider } from "../lib/assets/assets.interface";
import { ISceneComposerDefinition } from "../lib/helpers/scene-composer/scene-composer.interface";

export interface ISceneInitialData extends ISceneConfig {
  composerDefinitions: ISceneComposerDefinition<unknown>[]
}

export interface ISceneAppDeps extends IRendererConfig {
  inputs: Observable<PointerEvent>;
  animationFrameProvider: AnimationFrameProvider;
  canvasRef: HTMLElement;
  assetsProvider: IAssetsProvider;
  height: number;
  width: number;
}