import { MeshPhongMaterial, Mesh, CylinderGeometry } from "three";
import { BlankFieldObject } from "./blank-field.game-object";
import { IBlankFieldComposerDefinition, IBlankFieldCreationDefinition, IBlankFieldDefinition } from "./blank-field.interface";
import { IAssetDeclaration } from "../../../../assets/assets.interface";
import { blankFieldComposerDefinitionName } from "./blank-field.constants";
import { ActorsManager } from "../../../actors-manager";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";

export class BlankFieldFactory extends ActorFactoryBase<IBlankFieldComposerDefinition, BlankFieldObject>  {
  constructor(
    private readonly _actorsManager: ActorsManager
  ) { 
    super(blankFieldComposerDefinitionName)
  }

  public static async build(def: IBlankFieldDefinition): Promise<Mesh<CylinderGeometry, MeshPhongMaterial>> {
    const blankFieldMaterial = new MeshPhongMaterial({
      color: def.primaryColor,
      opacity: 100,
    });
    const mesh = new Mesh(new CylinderGeometry(1, 1, 0, 6), blankFieldMaterial);
    mesh.visible = false;
    mesh.receiveShadow = false;
    mesh.castShadow = false;
    return mesh;
  }

  public async create(def: IBlankFieldCreationDefinition): Promise<BlankFieldObject> {
    const mesh = await BlankFieldFactory.build(def);
    const blankField = new BlankFieldObject(def, mesh);
    return blankField;
  }

  public async compose(def: IBlankFieldComposerDefinition): Promise<void> {
    const blankField = await this.create(def);
    this._actorsManager.initializeObject(blankField);
    def.position.x *= 2;
    def.position.z *= 1.7;
    blankField.setPosition(def.position);
    if (def.offsetY) {
      blankField.object.position.setY(def.offsetY);
    }
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return [];
  }
}