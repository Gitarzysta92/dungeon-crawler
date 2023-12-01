import { RendererConfig } from "../../lib/internals/rendering/renderer";
import { ViewConfig } from "../../lib/internals/scene/view";

interface ISceneCommonData {
  canvasRef: HTMLElement
  height: number,
  width: number
}

export type ISceneData = ISceneCommonData &
  Omit<RendererConfig, "canvasRef" | "width" | "height"> &
  Omit<ViewConfig, "cavasRef" | "width" | "height">;