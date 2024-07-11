import { Observable } from "rxjs";
import { IRendererConfig } from "../lib/core/renderer.interface";
import { IAssetsProvider } from "../lib/assets/assets.interface";
import { ISceneComposerDefinition } from "../lib/helpers/scene-composer/scene-composer.interface";
import { ISceneConfig } from "../lib/components/scene/scene.interface";

export interface ISceneInitialData extends Partial<ISceneConfig>  {
  composerDeclarations: ISceneComposerDefinition<unknown>[]
}

export interface ISceneAppDeps extends IRendererConfig {
  //inputs: Observable<PointerEvent>;
  animationFrameProvider: AnimationFrameProvider;
  //canvasRef: HTMLElement;
  assetsProvider: IAssetsProvider;
  height: number;
  width: number;
}