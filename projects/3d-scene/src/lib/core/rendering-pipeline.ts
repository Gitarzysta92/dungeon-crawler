import { WebGLRenderer, Scene, Camera, Vector2, ShaderMaterial} from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import fragmentShader from "../shaders/glow.fragment";
import vertexShader from "../shaders/glow.vertex";
import { Renderer } from "./renderer";
import { SceneWrapper } from "./scene-wrapper";


export class RenderingPipeline {
  
  private _renderPass: RenderPass | undefined;
  private _bloomPass: UnrealBloomPass | undefined;
  private _bloomComposer: EffectComposer | undefined;
  private _composer: EffectComposer | undefined;

  constructor(
    private readonly _renderer: Renderer,
    private readonly _sceneWrapper: SceneWrapper
  ) {}

  public initialize() {
    this._renderPass = new RenderPass(this._sceneWrapper.scene, this._sceneWrapper.camera);
    // this._bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth/10, window.innerHeight/10), 0.3, 0.1, 0.5);
    // this._bloomComposer = new EffectComposer(this._renderer.webGlRenderer);
    // this._bloomComposer.renderToScreen = false;
    // this._bloomComposer.addPass(this._renderPass);
    // this._bloomComposer.addPass(this._bloomPass);
    // const finalPass = this._getFinalPass();
    this._composer = new EffectComposer(this._renderer.webGlRenderer);
    this._composer.addPass(this._renderPass);
    //this._composer.addPass(finalPass);
  }

  public render() {
    // const fog = this._scene.fog;
    // const prevColor = this._scene.background;
    // this._scene.fog = null;
    // this._scene.background = null;
    // this._scene.traverse((o: any) => o.userData.ref && o.userData.ref.applyMask());
    // this._bloomComposer.render();
    
    // this._scene.fog = fog;
    // this._scene.background = prevColor;
    // this._scene.traverse((o: any) => o.userData.ref && o.userData.ref.cancelMask())
    this._composer?.render();
  }

  // private _getFinalPass(): ShaderPass {
  //   const finalPass = new ShaderPass(
  //     new ShaderMaterial({
  //       uniforms: {
  //         baseTexture: { value: null },
  //         bloomTexture: { value: this._bloomComposer.renderTarget2.texture }
  //       },
  //       vertexShader: vertexShader, 
  //       fragmentShader: fragmentShader,
  //       defines: {},
  //     }), 'baseTexture'
  //   );
  //   finalPass.needsSwap = true;
  //   return finalPass;
  // }
}