import { BoxGeometry, CylinderGeometry, Group, Mesh, MeshBasicMaterial, MeshPhongMaterial, RingGeometry, Vector3, sRGBEncoding } from "three";
import { IAssetDeclaration, IAssetsProvider } from "../../../../assets/assets.interface";
import { ActorsManager } from "../../../actors-manager";
import { PlainTile } from "./plain-tile.game-object";
import { AnimationService } from "../../../../animations/animation.service";
import { modelFileExtensionName } from "../../../../assets/assets.constants";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { tokenHoopOneModelFileName } from "../common-tile/common-tile.constants";
import { IPlainTileComposerDefinition, IPlainTileDefinition } from "./plain-tile.interface";
import { plainTileComposerDefinitionName } from "./plain-tile.constants";
import { FieldBase } from "../../fields/common/base-field.game-object";

export class PlainTileFactory extends ActorFactoryBase<IPlainTileComposerDefinition, PlainTile> {

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _assetsProvider: IAssetsProvider,
    private readonly _animationDispatcher: AnimationService
  ) { 
    super(plainTileComposerDefinitionName)
  }

  public async create(def: IPlainTileComposerDefinition): Promise<PlainTile> {
    const tile = await PlainTileFactory.build(def, this._assetsProvider);
    return new PlainTile(def, () => this._buildOutletMarker(def), tile, this._animationDispatcher);
  }

  public async compose(def: IPlainTileComposerDefinition) {
    const token = await this.create(def);
    token.setRotation(def.rotation);
    this._actorsManager.initializeObject(token);
    token.setUserData(def.userData);
    const field = this._actorsManager.getObjectById<FieldBase & any>(def.takenFieldId!);
    if (field) {
      const { coords } = field.takeBy(token, def.takenFieldId);

      token.afterEnteringScene(coords, def.initialAnimationDelay);
    } else if (def.position) {
      token.setPosition(def.position);
    }
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {   
    return [
      { fileName: tokenHoopOneModelFileName, ext: modelFileExtensionName }
    ]
  }

  public static async build(def: IPlainTileDefinition, assetsProvider: IAssetsProvider): Promise<Mesh<CylinderGeometry, MeshPhongMaterial>> {
    const texture = await assetsProvider.loadAsync(def.texture);
    texture.encoding = sRGBEncoding;
    const topMaterial = new MeshBasicMaterial({ map: texture, color: 0xffffff });
    const innerMesh = new Mesh(new RingGeometry(0, 0.75, 6), topMaterial);

    const sideMaterial = new MeshPhongMaterial({ color: def.primaryColor, shininess: 100, specular: 0x5266ff  });
    const mesh = new Mesh(new CylinderGeometry(0.85, 0.85, 0.05, 6), sideMaterial);
    innerMesh.lookAt(new Vector3(0, 1, 0));
    innerMesh.rotateZ(1.58);
    innerMesh.position.setY(0.05);
    mesh.add(innerMesh);
    return mesh;
  }

  private _buildOutletMarker(def: IPlainTileDefinition): Group {
    const sideMaterial = new MeshPhongMaterial({ color: def.primaryColor, shininess: 100, specular: 0x5266ff  });
    const mesh = new Mesh(new BoxGeometry(0.2, 0.05, 0.2), sideMaterial);
    const group = new Group()
    group.add(mesh);
    mesh.position.setX(-0.70);
    mesh.rotateY(0.8)
    return group;
  }

}