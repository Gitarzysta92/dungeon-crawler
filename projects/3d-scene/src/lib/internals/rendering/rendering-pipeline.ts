// @ts-ignore
//import { Camera, Layers, Scene, ShaderMaterial, Vector2, WebGLRenderer } from "./three.js";
//   // @ts-ignore
// import { EffectComposer } from "./jsm/postprocessing/EffectComposer";
//   // @ts-ignore
// import { RenderPass } from "./jsm/postprocessing/RenderPass";
//   // @ts-ignore
// import { ShaderPass } from "./jsm/postprocessing/ShaderPass";
//   // @ts-ignore
// import { UnrealBloomPass } from "./jsm/postprocessing/UnrealBloomPass";

import { WebGLRenderer, Scene, Camera, Vector2, Layers, ShaderMaterial } from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { BLOOM_SCENE } from "../../constants/layers";

import fragmentShader from "../../shaders/glow.fragment";
import vertexShader from "../../shaders/glow.vertex";



export class RenderingPipeline {
  private _renderPass: RenderPass;
  private _bloomPass: UnrealBloomPass;
  private _bloomComposer: EffectComposer;
  private _composer: EffectComposer;
  private _bloomLayer: any;

  constructor(
    private readonly _renderer: WebGLRenderer,
    private readonly _scene: Scene,
    private readonly _camera: Camera
  ) {
    this._renderPass = new RenderPass(this._scene, this._camera);
    this._bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.2, 1, 0.2);

    this._bloomComposer = new EffectComposer(this._renderer);
    this._bloomComposer.renderToScreen = false;
    this._bloomComposer.addPass(this._renderPass);
    // this._bloomComposer.addPass(this._bloomPass);


    const finalPass = this._getFinalPass();
    this._composer = new EffectComposer(this._renderer);
    this._composer.addPass(this._renderPass);
    //this._composer.addPass(finalPass);

    this._bloomLayer = new Layers();
    this._bloomLayer.set(BLOOM_SCENE);
  }

  public render() {
    const fog = this._scene.fog;
    const prevColor = this._scene.background;
    this._scene.fog = null;
    this._scene.background = null;
    this._scene.traverse((o: any) => o.userData.ref && o.userData.ref.applyMask());
    //this._bloomComposer.render();
    
    this._scene.fog = fog;
    this._scene.background = prevColor;
    this._scene.traverse((o: any) => o.userData.ref && o.userData.ref.cancelMask());
    this._composer.render();
  }

  private _getFinalPass(): ShaderPass {
    const finalPass = new ShaderPass(
      new ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this._bloomComposer.renderTarget2.texture }
        },
        vertexShader: vertexShader, 
        fragmentShader: fragmentShader,
        defines: {},
      }), 'baseTexture'
    );
    finalPass.needsSwap = true;
    return finalPass;
  }
}