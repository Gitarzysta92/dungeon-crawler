import { MagicGate } from './magic-gate.game-object';
import { BufferGeometry, Color, DoubleSide, Group, Mesh, MeshLambertMaterial, PlaneGeometry, ShaderMaterial, Vector3 } from 'three';
import { buildVertexShader, buildFragmentShader } from '../../../../shaders/shared-builder';
import { magicGateComposerDefinitionName, gateModelFileName, gateBouldersModelFileName } from './magic-gate.constants';
import { IAssetDefinition, IAssetsProvider } from '../../../../assets/assets.interface';
import { ActorsManager } from '../../../actors-manager';
import { IMagicGateComposerDefinition, IMagicGateCreationDefinition, IMagicGateDefinition } from './magic-gate.interface';
import { PointLightFactory } from '../../../light-objects/point-light/point-light.factory';
import { modelFileExtensionName } from '../../../../assets/assets.constants';
import { ActorFactoryBase } from '../../../actor-factory-base.factory';
import { AnimationService } from '../../../../animations/animation.service';
import { FieldBase } from '../../fields/common/base-field.game-object';


export class MagicGateFactory extends ActorFactoryBase<IMagicGateComposerDefinition, MagicGate>  {

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _assetsLoader: IAssetsProvider,
    private readonly _animationService: AnimationService
  ) { 
    super(magicGateComposerDefinitionName)
  }

  public async create(def: IMagicGateCreationDefinition): Promise<MagicGate> {
    const { gate, teleportFirstLayer, teleportSecondLayer, light, boulders } = await MagicGateFactory.build(def, this._assetsLoader);
    const magicGateObject = new MagicGate(
      def,
      gate,
      teleportFirstLayer,
      teleportSecondLayer,
      light,
      boulders,
      this._animationService
    );
    gate.matrixAutoUpdate = false;
    gate.updateMatrix();
    teleportFirstLayer.matrixAutoUpdate = false;
    teleportFirstLayer.updateMatrix();
    teleportSecondLayer.matrixAutoUpdate = false;
    teleportSecondLayer.updateMatrix();
    return magicGateObject;
  }

  public async compose(def: IMagicGateComposerDefinition): Promise<void> {
    const token = await this.create(def);
    this._actorsManager.initializeObject(token);
    token.setRotation(def.rotation);
    const field = this._actorsManager.getObjectByAuxId<FieldBase>(def.takenFieldId!);
    if (field) {
      const { coords } = field.takeBy(token);
      token.afterEnteringScene(coords, def.initialAnimationDelay).then(() => token.update());
    } else if (def.position) {
      token.setPosition(def.position);
    }
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDefinition[] {
    return [
      { assetName: gateModelFileName, extensionName: modelFileExtensionName },
      { assetName: gateBouldersModelFileName, extensionName: modelFileExtensionName }
    ]
  }

  public static async build(
    def: IMagicGateDefinition,
    assetsLoader: IAssetsProvider,
  ) {
    const { gate, boulders } = await this._createGateMesh(def, assetsLoader);
    const { teleportFirstLayer, teleportSecondLayer } = this._createTeleportMeshes(def);
    const light = await PointLightFactory.build({
      color: def.lightColor,
      intensity: 15,
      distance: 5,
      decay: 2,
      radius: 1,
      castShadow: true
    });
    light.position.set(1, 2, 3)
    return { gate, teleportFirstLayer, teleportSecondLayer, light, boulders }
  }

  private static async _createGateMesh(def: IMagicGateDefinition, assetsLoader: IAssetsProvider) {
    const gate = (await assetsLoader.loadAsync(gateModelFileName, modelFileExtensionName)).scene.children[0];
    const material = new MeshLambertMaterial({ color: def.primaryColor });
    gate.material = material;
    gate.receiveShadow = true;
    gate.castShadow = true;
    gate.rotateY((Math.PI / 180) * 30);
    gate.position.set(0.45, 0.2, -0.25);

    const boulders = (await assetsLoader.loadAsync(gateBouldersModelFileName, modelFileExtensionName)).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>;
    boulders.material = material;
    boulders.receiveShadow = true;
    boulders.castShadow = true;
    boulders.position.setY(0);
    boulders.rotateY((Math.PI / 180) * 30);

    return { gate, boulders };
  }

  private static _createTeleportMeshes(
    def: IMagicGateDefinition
  ): {
    teleportFirstLayer: Mesh<PlaneGeometry, ShaderMaterial>,
    teleportSecondLayer: Mesh<PlaneGeometry, MeshLambertMaterial>
  } {
    // Portal section
    const teleportPlane = new PlaneGeometry(5.5, 5);
    teleportPlane.computeBoundingBox()
    const teleportFirstLayerMaterial = this._createTeleportMaterial(def);
    const teleportFirstLayer = new Mesh(teleportPlane, teleportFirstLayerMaterial);
    teleportFirstLayer.rotateY((Math.PI / 180) * 90);
    teleportFirstLayer.position.setY(1.5)
    teleportFirstLayer.position.setZ(3);
    teleportFirstLayer.position.setX(0.05);


    const teleportSecondLayerMaterial = new MeshLambertMaterial({
      color: def.primaryTeleportColor,
      transparent: true,
      opacity: 0.7,
      emissive: def.primaryTeleportColor,
      emissiveIntensity: 1,
      side: DoubleSide
    }); 
    const teleportSecondLayer = new Mesh(teleportPlane, teleportSecondLayerMaterial);
    teleportSecondLayer.rotateY((Math.PI / 180) * 90);
    teleportSecondLayer.position.setY(1.5)
    teleportSecondLayer.position.setZ(3);
    teleportSecondLayer.position.setX(0.01);

    return {
      teleportFirstLayer,
      teleportSecondLayer
    }
  }

  private static _createTeleportMaterial(def: IMagicGateDefinition): ShaderMaterial {
    return new ShaderMaterial({
      transparent: true,
      side: DoubleSide,
      uniforms: {
        color1: {
          value: new Color(def.secondaryTeleportColor)
        },
        iTime: {
          value: 0
        },
      },
      vertexShader: buildVertexShader(
        `
        uniform vec3 bboxMin;
        uniform vec3 bboxMax;
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
          uniform float iTime;
          varying vec2 vUv;
        `,
        `
          vec2 st = vUv;
          vec3 color = vec3(0.0);
          vec2 pos = vec2(st*3.);
      
          float DF = 0.0;
      
          // Add a random position
          float a = 0.0;
          vec2 vel = vec2(iTime*.1);
          DF += snoise(pos+vel)*.25+.25;
      
          // Add a random position
          a = snoise(pos*vec2(cos(iTime*0.5),sin(iTime*0.5))*0.1)*3.1415;
          vel = vec2(cos(a),sin(a));
          DF += snoise(pos+vel)*.25+.25;
      
          color = vec3( smoothstep(.7,.75,fract(DF)) );
          gl_FragColor = vec4(color1,color.x);
        `,
        `
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
          
          
          float snoise(vec2 v) {
              const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                  0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                  -0.577350269189626,  // -1.0 + 2.0 * C.x
                                  0.024390243902439); // 1.0 / 41.0
              vec2 i  = floor(v + dot(v, C.yy) );
              vec2 x0 = v -   i + dot(i, C.xx);
              vec2 i1;
              i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
              vec4 x12 = x0.xyxy + C.xxzz;
              x12.xy -= i1;
              i = mod289(i); // Avoid truncation effects in permutation
              vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                  + i.x + vec3(0.0, i1.x, 1.0 ));
          
              vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
              m = m*m ;
              m = m*m ;
              vec3 x = 2.0 * fract(p * C.www) - 1.0;
              vec3 h = abs(x) - 0.5;
              vec3 ox = floor(x + 0.5);
              vec3 a0 = x - ox;
              m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
              vec3 g;
              g.x  = a0.x  * x0.x  + h.x  * x0.y;
              g.yz = a0.yz * x12.xz + h.yz * x12.yw;
              return 130.0 * dot(m, g);
          }
        `
      ),
      //wireframe: true
    });
  }
}



// const light2 = new PointLight(0x274ef5, 40, 20, 1);
// light2.shadow.radius = 10;
// light2.castShadow = true;
// light2.receiveShadow = false;
// light2.shadow.mapSize.width = 812;
// light2.shadow.mapSize.height = 812;
// light2.position.setY(2);
// light2.position.setZ(2.5);
// light2.position.setX(1);