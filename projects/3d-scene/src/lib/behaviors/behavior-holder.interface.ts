import { Object3D } from "three";
import { IMixinBaseConstructor } from "../utils/mixin-composer/mixin-composer.interface";

export interface IBehaviorHolder {
  object: Object3D
}

export type BehaviorHolderClass = IMixinBaseConstructor<IBehaviorHolder>;