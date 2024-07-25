import { Camera, Mesh, Object3D, Vector3 } from "three";
import { IRawVector3 } from "../extensions/types/raw-vector3";

export interface IActor extends Partial<IActorDefinition> {
  id: string;
  object: Object3D;
  init: () => Object3D;
  matchId: (id: string) => boolean;
  matchAuxCoords: (auxCoords: string) => boolean;
  registerOnDestroy: (onDestroyCb: (x: IActor) => void) => void;
  onDestroy: () => void; 
  recalculate?: (sysTime: number) => void;
  setPosition: (p: Vector3 | IRawVector3) => void;
  update?: () => void;
  allowShadowMapAutoUpdate?: () => void;
  preventShadowMapAutoUpdate?: () => void;
  getViewportCoords(camera: Camera, ...args: unknown[]): IRawVector3;
  getUserData<T = unknown>(index?: number): T;
  setUserData(data: unknown): void;
  getMesh(): Mesh;
  clone(): IActor;
  dispose(): void;
}

export interface IActorDefinition {
  auxId: string;
  auxCoords: string;
}


