import { IActor } from "../actors/actors.interface";
import { IEffectTargetSelector } from "./effects.interface";


export function validateEffectSelector(selector: IEffectTargetSelector, actors: IActor[]): void {
  if (selector.selectorTargets === 'multiple' && selector.amountOfTargets! < actors.length) {
    throw new Error("EffectSelector: Too many selected actors");
  }

  for (let actor of actors) { 
    if (!selector.targetingActors.some(t => t === actor.actorType)) {
      throw new Error(`EffectSelector: Given actor type (${actor.actorType}) cannot be selected`);
    }
  }
    
}