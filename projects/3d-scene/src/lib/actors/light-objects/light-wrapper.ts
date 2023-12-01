import { Event, Light, Object3D } from "three";
import { Actor } from "../actor.interface";

export interface ShadowCameraSetting {
  near: number;
  far: number;
  left: number;
  right: number
  top: number;
  bottom: number;
}

export class LightWrapper implements Actor {
  public id: string;
  object!: Object3D<Event>;
  public cb: any;

  constructor(cb: any) {
    this.id = "";
    this.cb = cb;
  }

  public init(): Light {
    this.object = this.cb();
    return this.object as Light;
  } 
  
  public onDestroy = (onDestroy: (x: Actor) => void) => null;

}