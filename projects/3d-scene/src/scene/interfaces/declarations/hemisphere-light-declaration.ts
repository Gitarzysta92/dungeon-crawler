import { MapFactoryParamToInterface } from "../../../lib/actors/factory-param-to-interface";
import { LightsFactory } from "../../../lib/actors/lights.factory";
import { MapVectorToRawVector } from "../../types/map-vector-to-raw-vector";

export interface IHemisphereLightDeclaration {
  type: "hemisphere-light";
  params: MapVectorToRawVector<MapFactoryParamToInterface<typeof LightsFactory.createHemisphereLight>>;
}