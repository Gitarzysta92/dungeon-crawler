import { InstancedMesh, MeshStandardMaterial, SphereGeometry } from "three";
import { ParticlesObject } from "./particles.game-object";
import { IParticlesComposerDefinition, IParticlesDefinition } from "./particles.interface";
import { ActorsManager } from "../../../actors-manager";
import particleFragmentShader from "../../../../shaders/particle.fragment";
import particleVertexShader from "../../../../shaders/particle.vertex";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { particlesComposerDefinitionName } from "./particles.constants";
import { IAssetDeclaration } from "../../../../assets/assets.interface";

export class ParticlesFactory extends ActorFactoryBase<IParticlesComposerDefinition, ParticlesObject> {
  
  constructor(
    private readonly _actorsManager: ActorsManager
  ) { 
    super(particlesComposerDefinitionName)
  }

  public static async build(def: IParticlesDefinition): Promise<InstancedMesh<SphereGeometry, MeshStandardMaterial>> {
    const material = new MeshStandardMaterial({
      color: def.color,
      transparent: true,
      emissive: def.color,
      emissiveIntensity: 3,
      opacity: 1
    });
    material.onBeforeCompile = (s, r) => {
      s.fragmentShader = particleFragmentShader;
      s.vertexShader = particleVertexShader;
    };

    const geometry = new SphereGeometry(5, 5, 5);
    const mesh = new InstancedMesh(geometry, material, def.count);
    return mesh;
  }

  public async create(def: IParticlesComposerDefinition): Promise<ParticlesObject> {
    const particles = await ParticlesFactory.build(def);
    return new ParticlesObject(def, particles);
  }

  public async compose(def: IParticlesComposerDefinition): Promise<void> {
    const field = await this.create(def as IParticlesComposerDefinition);
    field.setPosition((def as IParticlesComposerDefinition).position)
    this._actorsManager.initializeObject(field);
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return [];
  }
}