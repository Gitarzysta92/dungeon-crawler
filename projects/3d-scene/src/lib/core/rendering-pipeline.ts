import {
  WebGLRenderTarget,
  LinearFilter,
  RGBAFormat,
  MeshBasicMaterial,
  ShaderMaterial,
  PlaneGeometry,
  Mesh,
  OrthographicCamera,
  Vector2,
  NoToneMapping,
  sRGBEncoding,
  Scene
} from "three";
import { Renderer } from "./renderer";
import { SceneWrapper } from "./scene-wrapper";
import { MultiResBloom } from "./multi-res-bloom";

export class RenderingPipeline {
  private readonly _renderer: Renderer;
  private readonly _sceneWrapper: SceneWrapper;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.Camera;

  private mainTarget!: WebGLRenderTarget;
  private bloomTargetA!: WebGLRenderTarget;
  private bloomTargetB!: WebGLRenderTarget;

  private fsScene!: THREE.Scene;
  private fsCamera!: OrthographicCamera;
  private fsQuad!: Mesh;
  private finalMaterial!: ShaderMaterial;

  private blurMaterial!: ShaderMaterial;

  private blackMat = new MeshBasicMaterial({ color: 0x000000 });
  private materialsCache = new Map<string, any>();

  private width: number;
  private height: number;
  private initialized = false;
  multiResBloom: MultiResBloom;

  constructor(renderer: Renderer, sceneWrapper: SceneWrapper) {
    this._renderer = renderer;
    this._sceneWrapper = sceneWrapper;

    this.width = renderer["._cfg"]?.width || window.innerWidth;
    this.height = renderer["._cfg"]?.height || window.innerHeight;
  }

  public initialize() {
    if (this.initialized) return;

    this.renderer = this._renderer.webGlRenderer;
    this.scene = this._sceneWrapper.scene;
    this.camera = this._sceneWrapper.camera;

    this.mainTarget = new WebGLRenderTarget(this.width, this.height, {
      format: RGBAFormat,
      minFilter: LinearFilter,
      magFilter: LinearFilter
    });
    this.mainTarget.samples = 4;

    this.bloomTargetA = this.mainTarget.clone();
    this.bloomTargetB = this.mainTarget.clone();

    // ✅ Final composite material
    this.fsScene = new Scene();
    this.fsCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.finalMaterial = new ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: null },
        bloomStrength: { value: 1.0 }
      },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }`,
      fragmentShader: `
        uniform sampler2D baseTexture;
        uniform sampler2D bloomTexture;
        uniform float bloomStrength;
        varying vec2 vUv;
        void main(){
          vec3 base=texture2D(baseTexture,vUv).rgb;
          vec3 bloom=texture2D(bloomTexture,vUv).rgb;
          vec3 finalColor=base+bloom*bloomStrength;
          finalColor=pow(finalColor,vec3(1.0/2.2));
          gl_FragColor=vec4(finalColor,1.0);
        }`
    });
    this.fsQuad = new Mesh(new PlaneGeometry(2, 2), this.finalMaterial);
    this.fsScene.add(this.fsQuad);

    this.multiResBloom = new MultiResBloom(this.renderer, this.width, this.height);
    this.initialized = true;
  }

  private renderBloomObjects(target: WebGLRenderTarget) {
    this.scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.userData.material = obj.material;
        if (obj.userData.bloomMaterial) {
          obj.material = obj.userData.bloomMaterial
        } else {
          obj.material = this.blackMat
        }
      }
    });

    this.renderer.setRenderTarget(target);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);

    this.scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.material = obj.userData.material;
      }
    });
  }

  public render() {
    if (!this.initialized) this.initialize();

    const r = this.renderer;
    r.toneMapping = NoToneMapping;

    // STEP 1: Render main scene
    r.setRenderTarget(this.mainTarget);
    r.clear();
    r.render(this.scene, this.camera);

    // STEP 2: Render bloom objects
    this.renderBloomObjects(this.bloomTargetA);

    // STEP 4: Multi res blur
    // Before rendering each frame
    const zoomFactor = this.camera.position.length(); // or camera.zoom for orthographic

    const blurredBloom = this.multiResBloom.process(this.bloomTargetA, (1.0 / zoomFactor));

    // STEP 5: Final composite
    r.setRenderTarget(null);
    r.outputEncoding = sRGBEncoding;
    this.finalMaterial.uniforms.baseTexture.value = this.mainTarget.texture;
    this.finalMaterial.uniforms.bloomTexture.value = blurredBloom.texture;
    r.render(this.fsScene, this.fsCamera);
  }

  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    if (!this.initialized) return;
    this.mainTarget.setSize(width, height);
    this.bloomTargetA.setSize(width, height);
    this.bloomTargetB.setSize(width, height);
    this.blurMaterial.uniforms.uResolution.value.set(width, height);
  }
}
