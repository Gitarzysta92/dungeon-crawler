import { ColorRepresentation, Vector3 } from "three";

export interface ISceneConfig {
  bgColor: ColorRepresentation,
  fogColor?: ColorRepresentation,
  initialCameraPosition?: Vector3
}