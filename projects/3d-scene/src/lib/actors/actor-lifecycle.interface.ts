import { Vector3 } from "three";

export interface IActorLifecycle { }

export interface IAfterInitialization extends IActorLifecycle { 
  afterInitialization: () => Promise<void> | void;
}

export interface IAfterEnteredScene extends IActorLifecycle {
  afterEnteringScene: (p: Vector3) => Promise<void> | void;
}

export interface IOnDestroy extends IActorLifecycle { 
  onDestroy: () => Promise<void> | void;
}

