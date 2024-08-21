import { AmbientLight } from "three";
import { LightWrapper } from "../common/light-wrapper";
import { IAmbientLightComposerDefinition, IAmbientLightCreationDefinition, IAmbientLightDefinition } from "./ambient-light.interface";
import { ambientLightComposerDefinitionName } from "./ambient-light.constants";
import { ActorsManager } from "../../actors-manager";
import { ActorFactoryBase } from "../../actor-factory-base.factory";
import { IAssetDeclaration } from "../../../assets/assets.interface";

export class AmbientLightFactory extends ActorFactoryBase<IAmbientLightComposerDefinition, LightWrapper> {
  
  constructor(
    private readonly _actorsManager: ActorsManager
  ) { 
    super(ambientLightComposerDefinitionName)
  }

  public async build(def: IAmbientLightDefinition): Promise<AmbientLight> {
    return new AmbientLight(def.color, def.intensity);
  }

  public async create(def: IAmbientLightCreationDefinition): Promise<LightWrapper> {
    return new LightWrapper(def, await this.build(def));
  }

  public async compose(def: IAmbientLightComposerDefinition): Promise<void> {
    const field = await this.create(def);
    field.setPosition(def.position)
    this._actorsManager.initializeObject(field);
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return [];
  }
}