import { BackSide, Color, Mesh, ShaderMaterial, SphereGeometry } from "three";
import { ActorsManager } from "../../../actors-manager";
import { stoneFiledmodelFileName } from "../../fields/stone-field/stone-field.constants";
import { IAssetDefinition } from "../../../../assets/assets.interface";
import { modelFileExtensionName } from "../../../../assets/assets.constants";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { buildVertexShader, buildFragmentShader } from "../../../../shaders/shared-builder";
import { ISkySphereComposerDefinition, ISkySphereCreationDefinition, ISkySphereDefinition } from "../../environment-details/sky-sphere/sky-sphere.interface";
import { skySphereComposerDefinitionName } from "../../environment-details/sky-sphere/sky-sphere.constants";


export class SkySphereFactory extends ActorFactoryBase<ISkySphereComposerDefinition, any>{

  constructor(
    private readonly _actorsManager: ActorsManager
  ) { 
    super(skySphereComposerDefinitionName)
  }
  
  public async create(def: ISkySphereCreationDefinition): Promise<Mesh<SphereGeometry, ShaderMaterial>> {
    return new Mesh(new SphereGeometry(50, 32, 15), this._createFireMaterial(def))
  }

  public async compose(def: ISkySphereComposerDefinition) {
    const skySphere = await this.create(def);
    //skySphere.rotateY(1.5)
    this._actorsManager.addObject(skySphere);
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDefinition[] {
    return [{
      assetName: stoneFiledmodelFileName,
      extensionName: modelFileExtensionName
    }]
  }


  private _createFireMaterial(def: ISkySphereDefinition): ShaderMaterial {

    return new ShaderMaterial({
      side: BackSide,
      //transparent: true,
      uniforms: {
        color1: {
          value: new Color(def.primeColor)
        },
        color2: {
          value: new Color(def.secondColor)
        },
      },
      vertexShader: buildVertexShader(
        `
          varying vec2 vUv;
        `,
        `
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        `
      ),
      fragmentShader: buildFragmentShader(
        `
          uniform vec3 color1;
          uniform vec3 color2;
          varying vec2 vUv;
        `,
        `
          vec3 whiteColor = vec3(1);
          vec2 center = vec2(0.5,0.55);
          float radius = 0.1;
          float distance = length(vUv - center);
          vec3 gradientCircleColor = mix(whiteColor, color1, smoothstep(radius - 0.2, radius + 0.4, distance));

          float normalizedValue = mix(0.0, 1.0, abs(fract(vUv.y * 1.0) - 0.5) * 1.0);
          vec3 secondGradientColor = mix(color1, color2, sin(vUv.x * 6.0 +1.72) * vUv.y);
          gl_FragColor = vec4(mix(secondGradientColor, gradientCircleColor, vUv.y * 0.4), 1.0);
        `
        ,
      //   `
      //   vec4 whiteColor = vec4(1);
      //   vec4 blackColor = vec4(0,0,0,1);
      //   vec4 transparentColor = vec4(0);

      //   vec4 color1a = vec4(color1, 1.0);
      //   vec4 color2a = vec4(color2, 1.0);
      //   vec4 color3a = vec4(color3, 1.0);
      //   vec4 color4a = vec4(color4, 1.0);

      //   vec2 center = vec2(0.5,0.55);
      //   vec2 offset = vec2(0.0, 0.0);
      //   vec2 stretch = vec2(1.0, 1.0);
        
      //   vec4 topGradientMask = mix(blackColor, whiteColor, sin((1.0 - vUv.y) * 2.0) * 1.2);
      //   vec4 bottomGradientMask = mix(blackColor, color3a, sin(vUv.y * 2.0) * 1.2);
      //   vec4 polarGradientColor = mix(bottomGradientMask, topGradientMask, smoothstep(0.5, 0.5, vUv.y));

      //   float radius = 0.1;
      //   float distance = length(vUv - center);
      //   vec4 gradientCircleColor = mix(whiteColor, color1a, smoothstep(radius - 0.2, radius + 0.4, distance));

      //   float normalizedValue = mix(0.0, 1.0, abs(fract(vUv.y * 1.0) - 0.5) * 1.0);
      //   vec4 secondGradientColor = mix(color1a, color2a, sin(vUv.x * 6.0 +1.72) * vUv.y);
      //   gl_FragColor = mix(secondGradientColor, gradientCircleColor, vUv.y * 0.5);

      //   //gl_FragColor = vec4(secondGradientColor);
      // `
        //vec4 secondGradientColor = mix(color3a, color4a, sin(vUv.x * 5.0 + 2.212));
        // `
        //   float circle(vec2 p0, vec2 pf, vec2 offset, vec2 stretch) {
        //     return pow((pf.x - p0.x) * stretch.x + offset.x, 2.0) + pow((pf.y-p0.y + offset.y) * stretch.y + offset.y, 2.0);
        //   }
        // `
        `
        float cNormalize(float value, float min, float max) {
          return (value - min) / (max - min);
        }
        `
      )
    });
  }
}