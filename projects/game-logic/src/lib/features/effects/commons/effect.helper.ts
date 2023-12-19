import { IActor } from "../../actors/actors.interface";
import { IEffectTargetSelector, IEffectBase } from "./effect.interface";

export class EffectHelper {
  
  public static validateEffectSelector(selector: IEffectTargetSelector, actors: IActor[]): void {
    if (selector.selectorTargets === 'multiple' && selector.amountOfTargets! < actors.length) {
      throw new Error("EffectSelector: Too many selected actors");
    }
  
    for (let actor of actors) { 
      if (selector.targetingActors && !selector.targetingActors.some(t => t === actor.actorType)) {
        throw new Error(`EffectSelector: Given actor type (${actor.actorType}) cannot be selected`);
      }
    }
  }
  
  public static validateEffect<T extends Object>(o: T): T & IEffectBase | undefined {
    let isEffect = true
    if (!o) {
      return;
    }
    if (!('effectName' in (o as T & IEffectBase))) {
      isEffect = false;
    }
    if (!('effectLifeTime' in (o as T & IEffectBase))) {
      isEffect = false;
    }
    if (!('effectTargetingSelector' in (o as T & IEffectBase))) {
      isEffect = false;
    }
    return isEffect ? o as T & IEffectBase : undefined;
  }
}