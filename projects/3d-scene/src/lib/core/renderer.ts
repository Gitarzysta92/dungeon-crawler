import { BasicShadowMap, LinearToneMapping, WebGLRenderer, sRGBEncoding } from "three";
import { IRendererConfig } from "./renderer.interface";

export class Renderer {
  
  public webGlRenderer!: WebGLRenderer;

  constructor(
    private readonly _cfg: IRendererConfig
  ) { }

  public initialize(): void {
    this.webGlRenderer = new WebGLRenderer({
      canvas: this._cfg.canvasRef,
      antialias: true,
      powerPreference: "high-performance",
    });

    this.webGlRenderer.shadowMap.enabled = true;
    this.webGlRenderer.shadowMap.type = BasicShadowMap;
    this.webGlRenderer.shadowMap.autoUpdate = false;
    this.webGlRenderer.shadowMap.needsUpdate = true;
    
    this.webGlRenderer.toneMapping = LinearToneMapping;
    this.webGlRenderer.outputEncoding = sRGBEncoding;
    this.adjustToViewportChange(this._cfg.width, this._cfg.height, this._cfg.pixelRatio);
  }

  public adjustToViewportChange(width: number, height: number, pixelRatio: number): void {
    this.webGlRenderer.setSize(width, height);
    this.webGlRenderer.setPixelRatio(pixelRatio);
  }

  public allowShadowMapAutoUpdate() {
    this.webGlRenderer.shadowMap.autoUpdate = true;
  }

  public preventShadowMapAutoUpdate() {
    this.webGlRenderer.shadowMap.autoUpdate = false;
    this.webGlRenderer.shadowMap.needsUpdate = true;
  }

}