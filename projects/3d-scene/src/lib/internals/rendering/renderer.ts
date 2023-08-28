import { PCFSoftShadowMap, ReinhardToneMapping, WebGLRenderer } from "three";

export interface RendererConfig {
  canvasRef: HTMLElement,
  pixelRatio: number,
  height: number,
  width: number
}

export class Renderer {
  public webGlRenderer!: WebGLRenderer;

  constructor() { }

  public initialize(cfg: RendererConfig): void {
    this.webGlRenderer = new WebGLRenderer({
      canvas: cfg.canvasRef,
      logarithmicDepthBuffer: true,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });

    this.webGlRenderer.shadowMap.enabled = true;
    this.webGlRenderer.shadowMap.type = PCFSoftShadowMap;
    this.webGlRenderer.shadowMap.autoUpdate = true;
    this.webGlRenderer.physicallyCorrectLights = true;
    this.webGlRenderer.toneMapping = ReinhardToneMapping;
    this.adjustToViewportChange(cfg.width, cfg.height, cfg.pixelRatio);
  }
  
  public adjustToViewportChange(width: number, height: number, pixelRatio: number): void {
    this.webGlRenderer.setSize(width, height);
    this.webGlRenderer.setPixelRatio(pixelRatio);
  }

}