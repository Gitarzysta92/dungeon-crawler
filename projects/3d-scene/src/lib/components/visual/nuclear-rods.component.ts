import { ShaderMaterial } from "three";
import { GameObjectFactory } from "../../actors/game-objects.factory";
import { LightsFactory } from "../../actors/lights.factory";
import { ActorsManager } from "../../actors/actors-manager";
import { INuclearRodArea } from "../interfaces/nuclear-rods-area";

export class NuclearRodsComponent {
  private _rodMaterial!: ShaderMaterial;

  constructor(
    private readonly _actorsManager: ActorsManager
  ) { }

  public recalculate(): void {
    this._rodMaterial.uniforms.time.value = performance.now() / 1000 as any;
  }

  public initialize(config: INuclearRodArea): void {
    this._rodMaterial = GameObjectFactory.rodMaterial;

    config.rods.forEach(r => {
      this._actorsManager.initializeObject(GameObjectFactory.createNuclearRod(r));
    })

    config.lights.forEach(l => {
      this._actorsManager.initializeObject(LightsFactory.createPointLight(l));
    })
  }
}