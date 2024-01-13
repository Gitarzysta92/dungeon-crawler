import { HemisphereLight } from "three";
import { ActorsManager } from "../../actors-manager";
import { LightWrapper } from "../common/light-wrapper";
import { IHemisphereLightComposerDefinition, IHemisphereLightCreationDefinition, IHemisphereLightDefinition } from "./hemisphere-light.interface";
import { hemisphereLightComposerDefinitionName } from "./hemisphere-light.constants";
import { ActorFactoryBase } from "../../actor-factory-base.factory";
import { IAssetDefinition } from "../../../assets/assets.interface";

export class HemisphereLightFactory extends ActorFactoryBase<IHemisphereLightComposerDefinition, LightWrapper> {

  constructor(
    private readonly _actorsManager: ActorsManager
  ) { 
    super(hemisphereLightComposerDefinitionName)
  }
  
  public static async build(def: IHemisphereLightDefinition): Promise<HemisphereLight> {
    return new HemisphereLight(def.skyColor, def.groundColor, def.intensity)
  }

  public async create(def: IHemisphereLightCreationDefinition): Promise<LightWrapper> {
    return new LightWrapper(def, await HemisphereLightFactory.build(def));
  }

  public async compose(def: IHemisphereLightComposerDefinition) {
    const field = await this.create(def);
    field.setPosition(def.position);
    this._actorsManager.initializeObject(field);
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDefinition[] {
    return [];
  }
}