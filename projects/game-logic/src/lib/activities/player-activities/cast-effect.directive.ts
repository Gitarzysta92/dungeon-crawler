import { IEffectBase } from "../../features/effects/commons/effect.interface";
import { DungeonGlobalState } from "../../gameplay/dungeon/dungeon-global-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { resolveCostAndInteraction } from "../../features/interactions/interactions";
import { DungeonActivityName } from "../constants/activity-name";
import { IItem } from "../../features/items/items.interface";
import { resolveEffect } from "../../features/effects/resolve-effect";
import { IEffectDefinition, IEffectPayload } from "../../features/effects/payload-definition.interface";
import { IDisposable, IReusable } from "../../features/interactions/interactions.interface";


export const castEffect = (payload: IEffectPayload): IDispatcherDirective =>
  async (state: DungeonGlobalState) => { 
    const effectItemIds = state.heroInventory.getAllItems<IEffectBase & IItem>()
      .filter(i => !!i.effectName)
      .map(i => i.id);
    
    const allowedEffectIds = state.heroPreparedSpellAndAbilityIds.concat(effectItemIds);
    if (!allowedEffectIds.some(id => payload.effect.id === id)) {
      throw new Error("Effect not possesed");
    }

    if ('utilizationCost' in payload.effect) {
      resolveCostAndInteraction(payload.effect as unknown as (IReusable | IDisposable), state.hero, true);
    }
    
    const signatures = resolveEffect(
      payload,
      state.board,
      state.heroInventory,
      state.getAllEffects()
    );

    return [{
      name: DungeonActivityName.CastEffect,
      payload: payload,
      effectSignatures: signatures
    }]
  }



export const validatePossibilityToUseEffect = (state: DungeonGlobalState, payload: IEffectDefinition) => {
  const effectItemIds = state.heroInventory.getAllItems<IEffectBase & IItem>()
      .filter(i => !!i.effectName)
      .map(i => i.id);

  const allowedEffectIds = state.heroPreparedSpellAndAbilityIds.concat(effectItemIds);
  if (!allowedEffectIds.some(id => payload.effect.id === id)) {
    return false;
  }

  if (!('utilizationCost' in payload.effect)) {
    return true;
  }

  try {
    resolveCostAndInteraction(payload.effect as unknown as (IReusable | IDisposable), { ...state.hero }, true);
  } catch {
    return false
  }
  return true;
}
