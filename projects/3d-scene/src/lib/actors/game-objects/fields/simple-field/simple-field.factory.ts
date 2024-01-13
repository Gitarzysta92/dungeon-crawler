import { CylinderGeometry, MeshStandardMaterial, Color, RingGeometry, Mesh } from "three";
import { IAssetDefinition } from "../../../../assets/assets.interface";
import { ActorsManager } from "../../../actors-manager";
import { SimpleFieldObject } from "./simple-field.game-object";
import { ISimpleFieldComposerDefinition, ISimpleFieldCreationDefinition, ISimpleFieldDefinition } from "./simple-field.interface";
import { simpleFieldComposerDefinitionName } from "./simple-field.constants";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";


export class SimpleFieldFactory extends ActorFactoryBase<ISimpleFieldComposerDefinition, SimpleFieldObject> {

  constructor(
    private readonly _actorsManager: ActorsManager
  ) {
    super(simpleFieldComposerDefinitionName);
  }

  public static async build(def: ISimpleFieldDefinition): Promise<Mesh<CylinderGeometry, MeshStandardMaterial>> {
    const mainGeometry = new CylinderGeometry(5, 5, 5, 6);
    const mainMaterial = new MeshStandardMaterial({
      color: new Color(0x222222),
      roughness: 0.65,
      metalness: 0.15,
      aoMapIntensity: 1,
      depthTest: true
    });
    const upperGeometry = new CylinderGeometry(5, 5, 0.5, 6);
    const upperMaterial = new MeshStandardMaterial({ color: new Color(0x222222) });
    const topGeometry = new RingGeometry(2, 4, 6);
    const topMaterial = new MeshStandardMaterial({ metalness: 0, roughness: 100, color: new Color(0x3d3d3d) });
    const mesh = new Mesh(mainGeometry, mainMaterial);
    const upperMesh = new Mesh(upperGeometry, upperMaterial);
    mesh.add(upperMesh);
    const topMesh = new Mesh(topGeometry, topMaterial);
    mesh.add(topMesh);
    return mesh;
  } 

  public async create(def: ISimpleFieldCreationDefinition): Promise<SimpleFieldObject> {
    const mesh = await SimpleFieldFactory.build(def);
    return new SimpleFieldObject(def, mesh);
  }


  public async compose(def: ISimpleFieldComposerDefinition): Promise<void> {
    const field = await this.create(def as ISimpleFieldComposerDefinition);
    field.setPosition((def as ISimpleFieldComposerDefinition).position);
    this._actorsManager.initializeObject(field);
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDefinition[] {
    return [];
  }

}