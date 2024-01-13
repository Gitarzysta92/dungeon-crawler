import { CylinderGeometry, Mesh, MeshStandardMaterial, ShaderMaterial } from "three";
import { NuclearRodObject } from "./nuclear-rod.game-object";
import { ActorsManager } from "../../../actors-manager";
import { INuclearRodComposerDefinition, INuclearRodDefinition } from "./nuclear-rod.interface";
import nuclearRodFragmentShader from "../../../../shaders/nuclear-rod.fragment";
import nuclearRodVertexShader from "../../../../shaders/nuclear-rod.vertex";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { nuclearRodComposerDefinitionName } from "./nuclear-rod.constants";
import { IAssetDefinition } from "../../../../assets/assets.interface";

export class NuclearRodFactory extends ActorFactoryBase<INuclearRodComposerDefinition, NuclearRodObject> {
 
  constructor(
    private readonly _actorsManager: ActorsManager
  ) { 
    super(nuclearRodComposerDefinitionName)
  }

  public static async build(def: INuclearRodDefinition): Promise<Mesh<CylinderGeometry, ShaderMaterial>> {
    const rodMaterial = new ShaderMaterial({
      uniforms: { time: { value: 1.0 } },
      vertexShader: nuclearRodVertexShader,
      fragmentShader: nuclearRodFragmentShader,
    });
    const rodGeometry = new CylinderGeometry(0.5, 0.5, 12, 12);
    const mesh = new Mesh(rodGeometry, rodMaterial);

    const material = new MeshStandardMaterial({ color: def.color });
    const upperGeometry = new CylinderGeometry(0.6, 0.6, 0.6, 12);
    const upperMesh = new Mesh(upperGeometry, material);
    mesh.add(upperMesh);
    const topGeometry = new CylinderGeometry(0.5, 0.5, 0.2, 12);
    const topMesh = new Mesh(topGeometry, material);
    mesh.add(topMesh);
    return mesh;
  }

  public async create(def: INuclearRodComposerDefinition): Promise<NuclearRodObject> {
    const object = await NuclearRodFactory.build(def);
    return new NuclearRodObject(object);
  }

  public async compose(def: INuclearRodComposerDefinition): Promise<void> {
    const field = await this.create(def);
    field.setPosition(def.position)
    this._actorsManager.initializeObject(field);
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDefinition[] {
    return [];
  }

}