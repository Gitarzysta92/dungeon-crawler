import { WebGLRenderer, Scene, Camera, Vector2, ShaderMaterial} from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { Renderer } from "./renderer";
import { SceneWrapper } from "./scene-wrapper";


export class RenderingPipeline {
  
  private _renderPass: RenderPass | undefined;
  private _bloomPass: UnrealBloomPass | undefined;
  private _composer: EffectComposer | undefined;

  constructor(
    private readonly _renderer: Renderer,
    private readonly _sceneWrapper: SceneWrapper
  ) {}

  public initialize() {
    this._renderPass = new RenderPass(this._sceneWrapper.scene, this._sceneWrapper.camera);
    
    // Create EffectComposer with UnrealBloomPass
    this._composer = new EffectComposer(this._renderer.webGlRenderer);
    this._composer.addPass(this._renderPass);
    
    // Add UnrealBloomPass for reliable bloom effect
    this._bloomPass = new UnrealBloomPass(
      new Vector2(this._renderer.webGlRenderer.domElement.width, this._renderer.webGlRenderer.domElement.height),
      0.5,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    this._composer.addPass(this._bloomPass);
  }

  public render() {
    // console.log('🎨 Rendering pipeline render called');
    // Temporarily use direct renderer instead of composer
    if (this._composer) {
      this._composer.render();
    } else {
      // Fallback to direct rendering
      this._renderer.webGlRenderer.render(this._sceneWrapper.scene, this._sceneWrapper.camera);
    }
  }

  public resize(width: number, height: number): void {
    this._bloomPass?.resolution.set(width, height);
  }

  public setFireballBloom(): void {
    if (this._bloomPass) {
      this._bloomPass.strength = 1.0;
      this._bloomPass.radius = 0.6;
      this._bloomPass.threshold = 0.7;
    }
    console.log('🔥 Fireball bloom preset applied');
  }

  public setExplosionBloom(): void {
    if (this._bloomPass) {
      this._bloomPass.strength = 1.5;
      this._bloomPass.radius = 0.8;
      this._bloomPass.threshold = 0.6;
    }
    console.log('💥 Explosion bloom preset applied');
  }

  public setSubtleBloom(): void {
    if (this._bloomPass) {
      this._bloomPass.strength = 0.5;
      this._bloomPass.radius = 0.4;
      this._bloomPass.threshold = 0.85;
    }
    console.log('✨ Subtle bloom preset applied');
  }

  public dispose(): void {
    // UnrealBloomPass handles its own disposal
  }
}