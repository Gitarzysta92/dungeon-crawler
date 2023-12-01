import { InstancedMesh, Mesh, Sprite } from "three";

export interface Animatable {
  animationSubject: Mesh | InstancedMesh | Sprite;
}