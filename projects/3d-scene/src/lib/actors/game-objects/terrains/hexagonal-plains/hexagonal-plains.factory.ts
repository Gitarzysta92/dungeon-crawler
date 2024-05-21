import { BufferGeometry, CylinderGeometry, InstancedMesh, MeshLambertMaterial, MeshPhongMaterial } from "three";
import { HexagonalPlainsObject } from "./hexagonal-plains.game-object";
import { ActorsManager } from "../../../actors-manager";
import { stoneFiledmodelFileName } from "../../fields/stone-field/stone-field.constants";
import { IAssetDefinition, IAssetsProvider } from "../../../../assets/assets.interface";
import { modelFileExtensionName } from "../../../../assets/assets.constants";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { AnimationService } from "../../../../animations/animation.service";
import { hexagonalPlainsComposerDefinitionName } from "./hexagonal-plains.constants";
import { IHexagonalPlainsComposerDefinition, IHexagonalPlainsDefinition } from "./hexagonal-plains.interface";




export class HexagonalPlainsTerrainFactory extends ActorFactoryBase<IHexagonalPlainsComposerDefinition, HexagonalPlainsObject> {

  constructor(
    private readonly _assetsLoader: IAssetsProvider,
    private readonly _actorsManager: ActorsManager,
    private readonly _animationService: AnimationService
  ) { 
    super(hexagonalPlainsComposerDefinitionName)
  }

  public validateComposer(defName: string): boolean {
    return defName === this.definitionName;
  }
  
  public static async build(def: IHexagonalPlainsDefinition): Promise<InstancedMesh<BufferGeometry, MeshLambertMaterial>> {
    const material = new MeshPhongMaterial({
      color: def.color,
      opacity: 100
    });
    const cylinderGeometry = new CylinderGeometry(1, 1, 0.4, 6);

    const mesh = new InstancedMesh(cylinderGeometry, material, 2500);
    return mesh as any;
  }

  public static async create(def: IHexagonalPlainsComposerDefinition, animationService: AnimationService): Promise<HexagonalPlainsObject> {
    const plains = await HexagonalPlainsTerrainFactory.build(def);
    return new HexagonalPlainsObject(plains, animationService);
  }

  public async create(def: IHexagonalPlainsComposerDefinition): Promise<HexagonalPlainsObject> {
    const plains = await HexagonalPlainsTerrainFactory.build(def);
    return new HexagonalPlainsObject(plains, this._animationService);
  }

  public async compose(def: IHexagonalPlainsComposerDefinition) {
    const terrain = await this.create(def);
    this._actorsManager.initializeObject(terrain);
    terrain.afterEnteringScene(def.position);
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDefinition[] {
    return [{
      assetName: stoneFiledmodelFileName,
      extensionName: modelFileExtensionName
    }]
  }
}