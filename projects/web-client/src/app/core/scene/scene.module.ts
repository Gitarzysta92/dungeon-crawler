
import { EntityService } from "@game-logic/lib/base/entity/entity.service";
import { SceneMediumFactory } from "./mixins/scene-medium/scene-medium.factory";
import { ActorsManager } from "@3d-scene/lib/actors/actors-manager";
import { SceneService } from "./services/scene.service";

export class SceneModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _sceneService: SceneService
  ) { }
  
  public initialize() {
    this._entityService.useFactories([
      new SceneMediumFactory(this._sceneService),
    ]);
    return {};
  }
}