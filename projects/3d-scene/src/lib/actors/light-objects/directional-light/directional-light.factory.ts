import { CameraHelper, DirectionalLight, DirectionalLightHelper } from "three";
import { IDirectionalLightComposerDefinition, IDirectionalLightDefinition } from "./directional-light.interface";
import { LightWrapper } from "../common/light-wrapper";
import { ActorsManager } from "../../actors-manager";
import { ActorFactoryBase } from "../../actor-factory-base.factory";
import { directionalLightComposerDefinitionName } from "./directional-light.constants";
import { IAssetDeclaration } from "../../../assets/assets.interface";
import { shadowNear, shadowFar, shadowLeft, shadowLight, shadowTop, shadowBottom, shadowMapSizeWidth, shadowMapSizeHeight, shadowMapBias } from "../common/light.constants";

export class DirectionalLightFactory extends ActorFactoryBase<IDirectionalLightComposerDefinition, LightWrapper<DirectionalLight>> {
  constructor(
    private readonly _actorsManager: ActorsManager
  ) {
    super(directionalLightComposerDefinitionName)
  }

  public static async build(def: IDirectionalLightDefinition): Promise<DirectionalLight> {
    const directionalLight = new DirectionalLight(def.color, def.intensity);
    directionalLight.shadow.radius = def.radius;
    directionalLight.shadow.blurSamples = 1105;
    

    directionalLight.shadow.camera.near = def.shadow?.near ?? shadowNear;
    directionalLight.shadow.camera.far = def.shadow?.far ?? shadowFar;
    directionalLight.shadow.camera.left = def.shadow?.left ?? shadowLeft;
    directionalLight.shadow.camera.right = def.shadow?.right ?? shadowLight;
    directionalLight.shadow.camera.top = def.shadow?.top ?? shadowTop;
    directionalLight.shadow.camera.bottom = def.shadow?.bottom ?? shadowBottom;
    directionalLight.shadow.autoUpdate = true;
    directionalLight.shadow.needsUpdate = true;

    directionalLight.castShadow = true;
    directionalLight.receiveShadow = false;
    directionalLight.shadow.mapSize.width = shadowMapSizeWidth;
    directionalLight.shadow.mapSize.height = shadowMapSizeHeight;
    return directionalLight;
  }

  public async create(def: IDirectionalLightComposerDefinition): Promise<LightWrapper<DirectionalLight>> {
    return new LightWrapper(def, await DirectionalLightFactory.build(def));
  }

  public async compose(def: IDirectionalLightComposerDefinition) {
    const light = await this.create(def);
    light.setPosition(def.position);
    this._actorsManager.initializeObject(light);

    // const x = new DirectionalLightHelper(light.object as any);
    // this._actorsManager.addObject(x);
    // const y = new CameraHelper((light as any).object.shadow.camera);
    // this._actorsManager.addObject(y);
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return [];
  }
}