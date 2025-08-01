import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { WebGLRenderer, Scene, Camera, Vector2, Vector3, ShaderMaterial, PlaneGeometry, Mesh } from 'three';

// Import shaders
import thresholdVertexShader from '../shaders/bloom-threshold.vertex';
import thresholdFragmentShader from '../shaders/bloom-threshold.fragment';
import blurVertexShader from '../shaders/bloom-blur.vertex';
import blurFragmentShader from '../shaders/bloom-blur.fragment';
import combineVertexShader from '../shaders/bloom-combine.vertex';
import combineFragmentShader from '../shaders/bloom-combine.fragment';

export interface BloomConfig {
  threshold: number;
  smoothness: number;
  intensity: number;
  saturation: number;
  blurRadius: number;
  blurPasses: number;
}

export class BloomService {
  private thresholdPass: ShaderPass;
  private blurPasses: ShaderPass[] = [];
  private combinePass: ShaderPass;
  
  private config: BloomConfig = {
    threshold: 0.8,
    smoothness: 0.1,
    intensity: 1.2,
    saturation: 1.1,
    blurRadius: 1.0,
    blurPasses: 3
  };

  constructor(
    private renderer: WebGLRenderer,
    private scene: Scene,
    private camera: Camera,
    private composer: EffectComposer
  ) {
    this.setupBloomPipeline();
  }

  private setupBloomPipeline(): void {
    // Create threshold pass
    this.thresholdPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uThreshold: { value: this.config.threshold },
        uSmoothness: { value: this.config.smoothness }
      },
      vertexShader: thresholdVertexShader,
      fragmentShader: thresholdFragmentShader
    });
    this.composer.addPass(this.thresholdPass);
    
    // Create blur passes
    this.createBlurPasses();
    
    // Create combine pass
    this.combinePass = new ShaderPass({
      uniforms: {
        tBase: { value: null },
        tBloom: { value: null },
        uIntensity: { value: this.config.intensity },
        uSaturation: { value: this.config.saturation }
      },
      vertexShader: combineVertexShader,
      fragmentShader: combineFragmentShader
    });
    this.composer.addPass(this.combinePass);
  }

  private createBlurPasses(): void {
    // Clear existing blur passes
    this.blurPasses.forEach(pass => {
      this.composer.removePass(pass);
    });
    this.blurPasses = [];

    // Create new blur passes
    for (let i = 0; i < this.config.blurPasses; i++) {
      // Horizontal blur
      const horizontalBlur = new ShaderPass({
        uniforms: {
          tDiffuse: { value: null },
          uDirection: { value: new Vector2(1.0, 0.0) },
          uResolution: { value: new Vector2(this.renderer.domElement.width, this.renderer.domElement.height) },
          uRadius: { value: this.config.blurRadius }
        },
        vertexShader: blurVertexShader,
        fragmentShader: blurFragmentShader
      });
      this.composer.addPass(horizontalBlur);
      this.blurPasses.push(horizontalBlur);

      // Vertical blur
      const verticalBlur = new ShaderPass({
        uniforms: {
          tDiffuse: { value: null },
          uDirection: { value: new Vector2(0.0, 1.0) },
          uResolution: { value: new Vector2(this.renderer.domElement.width, this.renderer.domElement.height) },
          uRadius: { value: this.config.blurRadius }
        },
        vertexShader: blurVertexShader,
        fragmentShader: blurFragmentShader
      });
      this.composer.addPass(verticalBlur);
      this.blurPasses.push(verticalBlur);
    }
  }

  public updateConfig(newConfig: Partial<BloomConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Update uniforms
    this.thresholdPass.uniforms.uThreshold.value = this.config.threshold;
    this.thresholdPass.uniforms.uSmoothness.value = this.config.smoothness;
    this.combinePass.uniforms.uIntensity.value = this.config.intensity;
    this.combinePass.uniforms.uSaturation.value = this.config.saturation;
    
    // Update blur radius
    this.blurPasses.forEach(pass => {
      pass.uniforms.uRadius.value = this.config.blurRadius;
    });
    
    // Recreate blur passes if count changed
    if (newConfig.blurPasses !== undefined) {
      this.createBlurPasses();
    }
  }

  public resize(width: number, height: number): void {
    // Update resolution uniforms
    const resolution = new Vector2(width, height);
    this.blurPasses.forEach(pass => {
      pass.uniforms.uResolution.value = resolution;
    });
  }

  public dispose(): void {
    // Remove passes from composer
    this.composer.removePass(this.thresholdPass);
    this.blurPasses.forEach(pass => {
      this.composer.removePass(pass);
    });
    this.composer.removePass(this.combinePass);
  }

  // Preset configurations for different effects
  public setFireballPreset(): void {
    this.updateConfig({
      threshold: 0.7,
      smoothness: 0.2,
      intensity: 1.5,
      saturation: 1.2,
      blurRadius: 1.5,
      blurPasses: 4
    });
  }

  public setExplosionPreset(): void {
    this.updateConfig({
      threshold: 0.6,
      smoothness: 0.3,
      intensity: 2.0,
      saturation: 1.3,
      blurRadius: 2.0,
      blurPasses: 5
    });
  }

  public setSubtlePreset(): void {
    this.updateConfig({
      threshold: 0.9,
      smoothness: 0.1,
      intensity: 0.8,
      saturation: 1.0,
      blurRadius: 0.8,
      blurPasses: 2
    });
  }
} 