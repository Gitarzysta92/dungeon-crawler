import { InstancedMesh, Mesh, Sprite } from "three";

export interface IAnimatable {
  animationSubject: Mesh | InstancedMesh | Sprite;
}

export interface ITweenAnimationDefinition<T> {
  from: T,
  to: T
  animationTime: number,
  delay?: number
}