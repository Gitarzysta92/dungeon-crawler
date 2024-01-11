import { Vector3 } from "three";

export interface IActorLifecycle { }

export interface IAfterActorInitialization extends IActorLifecycle { 
  afterInitialization: () => Promise<void> | void;
}

export interface IAfterActorEnteringScene extends IActorLifecycle {
  afterEnteringScene: (p: Vector3) => Promise<void> | void;
}

export interface IOnActorDestroy extends IActorLifecycle { 
  onDestroy: () => Promise<void> | void;
}

