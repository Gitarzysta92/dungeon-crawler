import { IActor } from "../../../actors/actors.interface";
import { IEffect } from "../../resolve-effect.interface";
import { IAffectable, IEffectBase, ILastingEffect } from "../effect.interface";
import { IEffectsState } from "./effects-state.interface";

export class EffectsStateHandler implements IEffectsState {
  lastingEffects: IEffectBase[];
  
  disposeLastingEffects(effects: ILastingEffect[], turn: number): void {
    for (let effect of effects) {
      if (effect.deploymentTurn != null && effect.deploymentTurn + effect.durationInTurns < turn) {
        effect.inactive = true;
      }
    }
  }

  public getAllEffects(): IEffect[] {
    const actorEffects = this.getAllActors<IActor & IAffectable<IEffect>>()
      .reduce<IEffect[]>((a, c) => Array.isArray(c.lastingEffects) ? a.concat(c.lastingEffects as IEffect[]) : a, []);
    
    const itemEffects = this.heroInventory.getAllEquippedItems();
    return actorEffects.concat(itemEffects as unknown as IEffect[])
      .reduce<IEffect[]>((a, c) => c.secondaryEffects ? a.concat(c.secondaryEffects as IEffect[]) : a, []); 
  }

  
}