import { 
  BasicShadowMap, LinearToneMapping, NoToneMapping, 
  PCFShadowMap, WebGLRenderer, sRGBEncoding, LinearEncoding 
} from "three";
import { IRendererConfig } from "./renderer.interface";

export enum RendererMode {
  MAIN = "main",
  BLOOM = "bloom",
}

export class Renderer {
  
  public webGlRenderer!: WebGLRenderer;
  private _currentMode: RendererMode = RendererMode.MAIN;

  constructor(private readonly _cfg: IRendererConfig) {}

  public initialize(canvasRef: HTMLElement): void {
    this.webGlRenderer = new WebGLRenderer({
      canvas: canvasRef,
      antialias: true,
      powerPreference: "high-performance",
      alpha: true
    });
    
    // Shadow settings
    this.webGlRenderer.shadowMap.enabled = true;
    this.webGlRenderer.shadowMap.type = PCFShadowMap;
    this.webGlRenderer.shadowMap.autoUpdate = true;
    this.webGlRenderer.shadowMap.needsUpdate = true;
    
    // ✅ Start in MAIN mode
    this.setMode(RendererMode.MAIN);
    this.adjustToViewportChange(this._cfg.width, this._cfg.height, this._cfg.pixelRatio);
  }

  public adjustToViewportChange(width: number, height: number, pixelRatio: number): void {
    this.webGlRenderer.setSize(width, height);
    this.webGlRenderer.setPixelRatio(pixelRatio);
  }

  public allowShadowMapAutoUpdate(): void {
    this.webGlRenderer.shadowMap.autoUpdate = true;
  }

  public preventShadowMapAutoUpdate(): void {
    this.webGlRenderer.shadowMap.autoUpdate = false;
    this.webGlRenderer.shadowMap.needsUpdate = true;
  }

  // ✅ Mode switching
  public setMode(mode: RendererMode): void {
    if (this._currentMode === mode) return;

    switch (mode) {
      case RendererMode.MAIN:
        this.webGlRenderer.toneMapping = LinearToneMapping;
        this.webGlRenderer.outputEncoding = sRGBEncoding;
        break;

      case RendererMode.BLOOM:
        this.webGlRenderer.toneMapping = NoToneMapping;
        this.webGlRenderer.outputEncoding = LinearEncoding;
        break;
    }

    this._currentMode = mode;
  }

  public getMode(): RendererMode {
    return this._currentMode;
  }
}
