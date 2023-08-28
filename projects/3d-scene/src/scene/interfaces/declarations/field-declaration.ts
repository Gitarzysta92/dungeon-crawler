import { MapFactoryParamToInterface } from "../../../lib/actors/factory-param-to-interface";
import { GameObjectFactory } from "../../../lib/actors/game-objects.factory";
import { MapVectorToRawVector } from "../../types/map-vector-to-raw-vector";

export type ISceneFieldDeclaration = MapVectorToRawVector<MapFactoryParamToInterface<typeof GameObjectFactory.createHexField>>;