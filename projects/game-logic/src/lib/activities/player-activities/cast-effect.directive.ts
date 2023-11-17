import { IEffectBase } from "../../features/effects/effects.interface";
import { DungeonState } from "../../game/dungeon-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { resolveCostAndInteraction } from "../../features/interactions/interactions";
import { DungeonActivityName } from "../constants/activity-name";
import { IItem } from "../../features/items/items.interface";
import { CastEffectPayload } from "../../features/effects/effects-commons.interface";
import { resolveEffect } from "../../features/effects/resolve-effect";


export const castEffect = (payload: CastEffectPayload): IDispatcherDirective =>
  async (state: DungeonState) => {
   
    const effectItemIds = state.heroInventory.getAllItems<IEffectBase & IItem>()
      .filter(i => !!i.effectName)
      .map(i => i.id);
    const allowedEffectIds = state.heroPreparedSpellAndAbilityIds.concat(effectItemIds);
    if (!allowedEffectIds.some(id => payload.effect.id === id)) {
      throw new Error("Effect not possesed");
    }

    if ('utilizationCost' in payload.effect) {
      resolveCostAndInteraction(payload.effect, state.hero, true);
    }
    
    if ('selectorOriginCoordinates' in payload.effect && !payload.effect.selectorOriginCoordinates) {
      payload.effect.selectorOriginCoordinates = state.hero.position!;
    }

    resolveEffect(
      payload.effect,
      payload.effectData!,
      state.hero,
      state.board,
      state.heroInventory,
      state.getAllEffects()
    )

    return [{
      name: DungeonActivityName.CastEffect,
      payload: payload,
    }]
  }


export const validatePossibilityToUseEffect = (state: DungeonState, payload: CastEffectPayload) => {
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
    resolveCostAndInteraction(payload.effect, { ...state.hero }, true);
  } catch {
    return false
  }

  return true;
}
