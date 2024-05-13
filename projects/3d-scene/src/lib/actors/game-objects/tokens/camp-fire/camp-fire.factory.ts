import { Color, Group, ShaderMaterial, MeshLambertMaterial, Mesh, BufferGeometry, Box3, Sprite, SpriteMaterial } from "three";
import { buildFragmentShader, buildVertexShader } from "../../../../shaders/shared-builder";
import { ActorsManager } from "../../../actors-manager";
import { CampFireObject } from "./camp-fire.game-object";
import { IAssetDefinition, IAssetsProvider } from "../../../../assets/assets.interface";
import { PointLightFactory } from "../../../light-objects/point-light/point-light.factory";
import { alphaMapFileExtensionName, modelFileExtensionName } from "../../../../assets/assets.constants";
import { campFireAlphaMapFileName, campFireDefinitionName, campFireFlamesModelFileName, campFireWoodModelFileName } from "./camp-fire.constants";
import { ICampFireComposerDefinition, ICampFireCreationDefinition, ICampFireDefinition } from "./camp-fire.interface";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { AnimationService } from "../../../../animations/animation.service";
import { FieldBase } from "../../fields/common/base-field.game-object";

export class CampFireFactory extends ActorFactoryBase<ICampFireComposerDefinition, CampFireObject> {
  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _assetsLoader: IAssetsProvider,
    private readonly _anmationService: AnimationService
  ) { 
    super(campFireDefinitionName)
  }

  public async create(def: ICampFireCreationDefinition): Promise<CampFireObject> {
    const campFire = await CampFireFactory.build(def, this._assetsLoader, PointLightFactory)
    return new CampFireObject(def, campFire, this._anmationService);
  }

  
  public async compose(def: ICampFireComposerDefinition): Promise<void> {
    const token = await this.create(def);
    this._actorsManager.initializeObject(token);
    token.setRotation(def.rotation);
    const field = this._actorsManager.getObjectById<FieldBase & any>(def.takenFieldId!);
    if (field) {
      const { coords } = field.takeBy(token, def.takenFieldId);
      token.afterEnteringScene(coords, def.initialAnimationDelay);
    } else if (def.position) {
      token.setPosition(def.position);
    }
    def.isHandled = true;
  }


  public static async build(
    def: ICampFireDefinition,
    assetsLoader: IAssetsProvider,
    pointLightFactory: typeof PointLightFactory
  ): Promise<Group> {
    const group = new Group();
    // Wood section
    let gltb = await assetsLoader.loadAsync(campFireWoodModelFileName, modelFileExtensionName);
    const woodMesh = gltb.scene.children[0] as Group;
    woodMesh.receiveShadow = true;
    woodMesh.castShadow = true;
    const woodMaterial = new MeshLambertMaterial({
      color: def.woodColor,
    })
    woodMesh.children.forEach((c: any) => {
      c.material = woodMaterial;
    })
    woodMesh.position.setX(-0.3);
    woodMesh.position.setY(-0.15);
    woodMesh.position.setZ(-1.1);
    woodMesh.matrixAutoUpdate = false;
    woodMesh.updateMatrix();
    group.add(woodMesh)

    gltb = await assetsLoader.loadAsync(campFireFlamesModelFileName , modelFileExtensionName);
    // Fire section
    const fireMesh = gltb.scene.children[0] as Mesh<BufferGeometry, ShaderMaterial>;
    fireMesh.receiveShadow = false;
    fireMesh.castShadow = false;
    fireMesh.position.setX(0);
    fireMesh.position.setY(0.3);
    fireMesh.position.setZ(0);
    fireMesh.geometry.computeBoundingBox()
    const fireMaterial = this._createFireMaterial(fireMesh.geometry.boundingBox!, def);
    fireMesh.material = fireMaterial;
    fireMesh.matrixAutoUpdate = false;
    fireMesh.updateMatrix();
    group.add(fireMesh);
    
    const map = await assetsLoader.loadAsync(campFireAlphaMapFileName, alphaMapFileExtensionName);
    const spriteMaterial = new SpriteMaterial({
      color: def.flameBloomColor,
      opacity: 0.8,
      alphaMap: map,
    })
    const sprite = new Sprite(spriteMaterial);
    sprite.scale.set(1.4, 1.4, 1.4)
    sprite.position.setY(0.5);
    sprite.position.setZ(0);
    group.add( sprite );

    const light = await pointLightFactory.build({
      color: def.secondaryLightColor,
      intensity: 30,
      distance: 10,
      decay: 1,
      castShadow: false
    })
    light.position.setY(2);
    fireMesh.add(light);
    return group;
  }


  public getRequiredAssetDefinitions(): IAssetDefinition[] {
    return [
      { assetName: campFireFlamesModelFileName, extensionName: modelFileExtensionName },
      { assetName: campFireWoodModelFileName, extensionName: modelFileExtensionName },
      { assetName: campFireAlphaMapFileName, extensionName: alphaMapFileExtensionName }
    ]
  }
  

  private static _createFireMaterial(box: Box3, def: ICampFireDefinition): ShaderMaterial {
    return new ShaderMaterial({
      uniforms: {
        color1: {
          value: new Color(def.flameColor[0])
        },
        color2: {
          value: new Color(def.flameColor[1])
        },
        color3: {
          value: new Color(def.flameColor[2])
        },
        bboxMin: {
          value: box.min
        },
        bboxMax: {
          value: box.max
        }
      },
      vertexShader: buildVertexShader(
        `
        uniform vec3 bboxMin;
        uniform vec3 bboxMax;
        varying vec2 vUv;
        `,
        `
          vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
          vUv.x = (position.x - bboxMin.x) / (bboxMax.x - bboxMin.x);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        `
      ),
      fragmentShader: buildFragmentShader(
        `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          varying vec2 vUv;
        `,
        `
          vec3 gradientColor = mix(color1, color2, smoothstep(0.0, 1.0, vUv.y));
          gradientColor = mix(color3, gradientColor, smoothstep(1.0, 0.7, vUv.y));
          gl_FragColor = vec4(gradientColor, 1.0);
        `,
        // `
        //   vec4 mix1 = vec4(mix(color1, color2, vUv.x), 1);
        //   vec4 mix2 = vec4(mix(color1, color2, vUv.y), 1.0);

        //   vec3 color = palette(vUv.y, vec3(0.7,1,0.1),vec3(0.3,0.1,0.6),vec3(0.2,0.1,0.3),vec3(0.9,2.2,0.8));
        //   gl_FragColor = vec4(color, 1.0);
        // `,
        `
        vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d)
        {
            return a + b*cos( 6.28318*(c*t + d) );
        }
        `
      ),
      //wireframe: true
    });
  }
}