
import { EntityService } from "@game-logic/lib/base/entity/entity.service";
import { SceneMediumFactory } from "./mixins/scene-medium/scene-medium.factory";
import { ActorsManager } from "@3d-scene/lib/actors/actors-manager";

export class SceneModule {
  constructor(
    private readonly _entityService: EntityService,
  ) { }
  
  public initialize() {
    this._entityService.useFactories([
      new SceneMediumFactory(),
    ]);
    return {};
  }
}