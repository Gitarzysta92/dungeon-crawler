import { MapFactoryParamToInterface } from "../../actors/factory-param-to-interface";
import { GameObjectFactory } from "../../actors/game-objects.factory";
import { LightsFactory } from "../../actors/lights.factory";

export interface INuclearRodArea {
  rods: MapFactoryParamToInterface<typeof GameObjectFactory.createNuclearRod>[],
  lights: MapFactoryParamToInterface<typeof LightsFactory.createPointLight>[]
}