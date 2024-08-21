import { CylinderGeometry, Group, Mesh, MeshBasicMaterial, MeshPhongMaterial, Texture, Vector3, sRGBEncoding } from "three";
import { IAssetDeclaration, IAssetsProvider } from "../../../../assets/assets.interface";
import { ActorsManager } from "../../../actors-manager";
import { CommonTile } from "./common-tile.game-object";
import { ICommonTileDefinition, ICommonTileComposerDefinition } from "./common-tile.interface";
import { AnimationService } from "../../../../animations/animation.service";
import { modelFileExtensionName } from "../../../../assets/assets.constants";
import { commonTileComposerDefinitionName, outletMarkerJawel, outletMarkerJawelOneModelFileName, outletMarkerOne, outletMarkerOneModelFileName, tokenHoop, tokenHoopOneModelFileName } from "./common-tile.constants";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { FieldBase } from "../../fields/common/base-field.game-object";


export class CommonTileFactory extends ActorFactoryBase<ICommonTileComposerDefinition, CommonTile> {

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _assetsProvider: IAssetsProvider,
    private readonly _animationDispatcher: AnimationService
  ) { 
    super(commonTileComposerDefinitionName)
  }

  public async create(def: ICommonTileComposerDefinition): Promise<CommonTile> {
    const tile = await CommonTileFactory.build(def, this._assetsProvider);
    const assets = await this._preloadOutletMarkerAssets(this._assetsProvider);
    return new CommonTile(def, () => this._buildOutletMarker(def, assets), tile, this._animationDispatcher);
  }

  public async compose(def: ICommonTileComposerDefinition) {
    const token = await this.create(def);
    token.setRotation(def.rotation);
    this._actorsManager.initializeObject(token);
    token.setUserData(def.userData);
    const field = this._actorsManager.getObjectByPredicate<FieldBase & any>((a) => 'takeBy' in a && a.matchAuxCoords(token.auxCoords));
    if (field) {
      const { coords } = field.takeBy(token, def.auxCoords);
      token.afterEnteringScene(coords, def.initialAnimationDelay);
    } else if (def.position) {
      token.setPosition(def.position);
    }
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {   
    return [
      tokenHoop,
      outletMarkerOne,
      outletMarkerJawel
    ]
  }

  public static async build(def: ICommonTileDefinition, assetsProvider: IAssetsProvider): Promise<Mesh<CylinderGeometry, (MeshBasicMaterial | MeshPhongMaterial)[]>> {
    const texture = await assetsProvider.loadAsync(def.texture) as Texture;
    texture.encoding = sRGBEncoding;
    const topMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      map: texture
    });
    const sideMaterial = new MeshBasicMaterial({ color: def.primaryColor });
    const geometry = new CylinderGeometry(0.75, 0.75, 0.2, 6);
    const mainMesh = new Mesh(geometry, [sideMaterial, topMaterial, sideMaterial, sideMaterial]);
    geometry.rotateY(Math.PI)


    const hoopMesh = (await assetsProvider.loadAsync(tokenHoop)).scene.children[0].clone() as Mesh;
    hoopMesh.material = new MeshPhongMaterial({ color: def.primaryColor, shininess: 100, specular: 0x5266ff });
    hoopMesh.position.setX(-0.01);
    mainMesh.add(hoopMesh);
    mainMesh.scale.addScalar(0.05);
    return mainMesh;
  }

  private _buildOutletMarker(def: ICommonTileDefinition, asset: { marker: Mesh, jawel: Mesh }): Group {
    const sideMaterial = new MeshPhongMaterial({ color: def.primaryColor, shininess: 100, specular: 0x5266ff });
    const outletMarker = asset.marker.clone();
    outletMarker.material = sideMaterial;
    const jawelMaterial = new MeshPhongMaterial({ color: def.jawelColor, emissive: def.jawelColor, emissiveIntensity: 1 });
    const outletMarkerJawel = asset.jawel.clone();
    outletMarkerJawel.material = jawelMaterial;
    const og = new Group();
    og.add(outletMarkerJawel);
    og.add(outletMarker);
    og.children[0].position.setX(-0.66);
    og.children[1].position.setX(-0.66);
    return og;
  }

  private async _preloadOutletMarkerAssets(assetsProvider: IAssetsProvider): Promise<{ marker: Mesh, jawel: Mesh }> {
    return {
      marker: (await assetsProvider.loadAsync(outletMarkerOne)).scene.children[0] as Mesh,
      jawel: (await assetsProvider.loadAsync(outletMarkerJawel)).scene.children[0] as Mesh
    }
  }
}