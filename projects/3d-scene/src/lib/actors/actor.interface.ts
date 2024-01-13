import { Object3D, Vector3 } from "three";
import { IRawVector3 } from "../extensions/types/raw-vector3";

export interface IActor extends Partial<IActorDefinition> {
  id: string;
  object: Object3D
  init: () => Object3D;
  registerOnDestroy: (onDestroyCb: (x: IActor) => void) => void;
  destroy: () => void; 
  recalculate?: (sysTime: number) => void;
  setPosition: (p: Vector3 | IRawVector3) => void;
  update?: () => void;
  allowShadowMapAutoUpdate?: () => void;
  preventShadowMapAutoUpdate?: () => void;
}

export interface IActorDefinition {
  auxId: string;
}


