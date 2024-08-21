import { MeshStandardMaterial, DoubleSide, RingGeometry, Mesh } from "three";
import { ActorsManager } from "../../actors-manager";
import { IRotateArrowDefinition, IRotateArrowComposerDefinition, IRotateArrowCreationDefinition } from "./rotate-arrow.interface";
import { RotateArrowObject } from "./rotate-arrow.gui-object";
import { ActorFactoryBase } from "../../actor-factory-base.factory";
import { rotateArrowDefinitionName } from "./rotate-arrow.constants";
import { IAssetDeclaration } from "../../../assets/assets.interface";

export class RotateArrowFactory
  extends ActorFactoryBase<IRotateArrowComposerDefinition, RotateArrowObject> {
  
  constructor(
    private readonly _actorsManager: ActorsManager
  ) { 
    super(rotateArrowDefinitionName)
  }

  public static async build(def: IRotateArrowDefinition): Promise<Mesh<RingGeometry, MeshStandardMaterial>> {
    const material = new MeshStandardMaterial({
      color: def.color,
      aoMapIntensity: 1,
      side: DoubleSide,
      transparent: true,
      opacity: 1,
      depthTest: true
    });

    const ringGeometry = new RingGeometry(6, 9, 30, 1, 0, 2.2);
    const mesh = new Mesh(ringGeometry, material);
    return mesh;
  }

  public async create(def: IRotateArrowCreationDefinition): Promise<RotateArrowObject> {
    const mesh = await RotateArrowFactory.build(def);
    return new RotateArrowObject(def, mesh);
  }

  public async compose(def: IRotateArrowComposerDefinition) {
    const field = await this.create(def as IRotateArrowComposerDefinition);
    field.setPosition((def as IRotateArrowComposerDefinition).position);
    this._actorsManager.initializeObject(field);
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return [];
  }

}