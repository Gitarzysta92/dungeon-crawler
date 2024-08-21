import { PointLight, PointLightHelper } from "three";
import { ActorsManager } from "../../actors-manager";
import { IPointLightComposerDefinition, IPointLightCreationDefinition, IPointLightDefinition } from "./point-light.interface";
import { LightWrapper } from "../common/light-wrapper";
import { ActorFactoryBase } from "../../actor-factory-base.factory";
import { IAssetDeclaration } from "../../../assets/assets.interface";
import { pointLightComposerDefinitionName } from "./point-light.constants";
import { shadowMapSizeHeight, shadowMapSizeWidth } from "../common/light.constants";

export class PointLightFactory extends ActorFactoryBase<IPointLightComposerDefinition, LightWrapper> {
  constructor(
    private readonly _actorsManager: ActorsManager
  ) { 
    super(pointLightComposerDefinitionName)
  }

  public static async build(def: IPointLightDefinition): Promise<PointLight> {
    const pointLight = new PointLight(def.color, def.intensity, def.distance, def.decay);
    pointLight.shadow.radius = def.radius ?? 10;
    pointLight.castShadow = def.castShadow ?? true;
    pointLight.receiveShadow = false;
    pointLight.shadow.mapSize.width = shadowMapSizeWidth;
    pointLight.shadow.mapSize.height = shadowMapSizeHeight;
    pointLight.shadow.autoUpdate = true;
    pointLight.shadow.needsUpdate = true;
    return pointLight;
  }

  public async create(def: IPointLightCreationDefinition): Promise<LightWrapper> {
    return new LightWrapper(def, await PointLightFactory.build(def));
  }

  public async compose(def: IPointLightComposerDefinition) {
    const field = await this.create(def);
    field.setPosition(def.position)

    this._actorsManager.initializeObject(field);
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return [];
  }
}