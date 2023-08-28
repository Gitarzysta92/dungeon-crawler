import { MapFactoryParamToInterface } from "../../../lib/actors/factory-param-to-interface";
import { GameObjectFactory } from "../../../lib/actors/game-objects.factory";
import { LightsFactory } from "../../../lib/actors/lights.factory";
import { MapVectorToRawVector } from "../../types/map-vector-to-raw-vector";
import { ISceneObjectDeclaration } from "./scene-object-declaration";

export type INuclearRodsAreaDeclaration = {
  rods: MapVectorToRawVector<MapFactoryParamToInterface<typeof GameObjectFactory.createNuclearRod>>[],
  lights: MapVectorToRawVector<MapFactoryParamToInterface<typeof LightsFactory.createPointLight>>[]
} & ISceneObjectDeclaration;