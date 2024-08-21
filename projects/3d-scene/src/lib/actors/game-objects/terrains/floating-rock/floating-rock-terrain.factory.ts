import { BufferGeometry, Group, Mesh, MeshLambertMaterial } from "three";
import { FloatingRockTerrainObject } from "./floating-rock-terrain.game-object";
import { floatingRockTerrainComposerDefinitionName, floatingRockTerrainModelFileName } from "./floating-rock-terrain.constants";
import { ActorsManager } from "../../../actors-manager";
import { stoneFiledmodelFileName } from "../../fields/stone-field/stone-field.constants";
import { IAssetDeclaration, IAssetsProvider } from "../../../../assets/assets.interface";
import { modelFileExtensionName } from "../../../../assets/assets.constants";
import { IFloatingRockComposerDefinition, IFloatingRockDefinition } from "./floating-rock-terrain.interface";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { AnimationService } from "../../../../animations/animation.service";


export class FloatingRockTerrainFactory extends ActorFactoryBase<IFloatingRockComposerDefinition, FloatingRockTerrainObject> {

  constructor(
    private readonly _assetsLoader: IAssetsProvider,
    private readonly _actorsManager: ActorsManager,
    private readonly _animationService: AnimationService
  ) { 
    super(floatingRockTerrainComposerDefinitionName)
  }
  
  public static async build(def: IFloatingRockDefinition, assetsLoader: IAssetsProvider): Promise<Mesh<BufferGeometry, MeshLambertMaterial>> {
    const mesh = (await assetsLoader.loadAsync({ fileName: floatingRockTerrainModelFileName, ext: modelFileExtensionName})).scene.children[0];
    mesh.material = new MeshLambertMaterial({ color: def.color });
    mesh.receiveShadow = true;

    const y = new Group();
    y.add(mesh);

    const x = (await assetsLoader.loadAsync({ fileName: "terrain-boulders", ext: modelFileExtensionName})).scene.children[0];
    x.material = new MeshLambertMaterial({ color: 0x808080 });
    x.position.set(-0.8, 1, 1.8)
    x.receiveShadow = true;
    x.castShadow = true;
    //x.scale.set(1.7,1.7,1.7)
    y.add(x);

    return y as any;
  }

  public async create(def: IFloatingRockComposerDefinition): Promise<FloatingRockTerrainObject> {
    const floatingRock = await FloatingRockTerrainFactory.build(def, this._assetsLoader);
    return new FloatingRockTerrainObject(floatingRock, this._animationService);
  }

  public async compose(def: IFloatingRockComposerDefinition) {
    const terrain = await this.create(def);
    this._actorsManager.initializeObject(terrain);
    terrain.afterEnteringScene(def.position);
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return [{
      fileName: stoneFiledmodelFileName,
      ext: modelFileExtensionName
    }]
  }
}