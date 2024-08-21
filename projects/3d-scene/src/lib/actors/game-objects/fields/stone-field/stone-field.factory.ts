import { BufferGeometry, Mesh, MeshLambertMaterial } from "three";
import { ActorsManager } from "../../../actors-manager";
import { stoneFiledmodelFileName, stoneFieldComposerDefinitionName } from "./stone-field.constants";
import { IStoneFieldComposerDefinition, IStoneFieldCreationDefinition, IStoneFieldDefinition } from "./stone-field.interface";
import { StoneFieldObject } from "./stone-field.game-object";
import { IAssetDeclaration, IAssetsProvider } from "../../../../assets/assets.interface";
import { modelFileExtensionName } from "../../../../assets/assets.constants";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { AnimationService } from "../../../../animations/animation.service";


export class StoneFieldFactory extends ActorFactoryBase<IStoneFieldComposerDefinition, StoneFieldObject>  {

  constructor(
    private readonly _assetsLoader: IAssetsProvider,
    private readonly _actorsManager: ActorsManager,
    private readonly _animationService: AnimationService
  ) { 
    super(stoneFieldComposerDefinitionName)
  }

  public static async build(def: IStoneFieldDefinition, assetsLoader: IAssetsProvider): Promise<Mesh<BufferGeometry, MeshLambertMaterial>> {
    const mesh = ((await assetsLoader.loadAsync({
      fileName: stoneFiledmodelFileName,
      ext: modelFileExtensionName
    })).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>).clone(true);
    mesh.material = new MeshLambertMaterial({
      color: def.primaryColor,
    });
    mesh.castShadow = true;
    mesh.geometry.center
    return mesh;
  }

  public async create(def: IStoneFieldCreationDefinition): Promise<StoneFieldObject> {
    const mesh = await StoneFieldFactory.build(def, this._assetsLoader);
    return new StoneFieldObject(def, mesh, this._animationService);
  }

  public async compose(def: IStoneFieldComposerDefinition) {
    const field = await this.create(def);
    this._actorsManager.initializeObject(field);
    field.setRandomRotation();
    if (def.offsetY) {
     def.position.y = def.offsetY;
    }
    field.setUserData(def.userData);
    field.afterEnteringScene(def.position, def.initialAnimationDelay);
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return [{
      fileName: stoneFiledmodelFileName,
      ext: modelFileExtensionName
    }]
  }

}