import { IEffectBase } from "../../features/effects/effects.interface";
import { DungeonState } from "../../game/dungeon-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { resolveCostAndInteraction } from "../../features/interactions/interactions";
import { DungeonActivityName } from "../constants/activity-name";
import { IItem } from "../../features/items/items.interface";
import { CastEffectPayload } from "../../features/effects/effect-commons.interface";
import { EffectName } from "../../features/effects/effects.constants";
import { resolveDealDamageByWeapon, resolveDealDamage } from "../../features/effects/deal-damage.effect";
import { resolveModifyPosition } from "../../features/effects/modify-position.effect";
import { resolveModifyStats } from "../../features/effects/modify-statistics.effect";
import { resolveSpawnActor } from "../../features/effects/spawn-actor.effect";


export const castEffect = (payload: CastEffectPayload): IDispatcherDirective =>
  async (state: DungeonState) => {
   
    const effectItemIds = state.heroInventory.getAllItems<IEffectBase & IItem>()
      .filter(i => !!i.effectName)
      .map(i => i.id);
    
    const allowedEffectIds = state.heroPreparedSpellAndAbilityIds.concat(effectItemIds);
    if (!allowedEffectIds.some(id => payload.effect.id === id)) {
      throw new Error("Effect not possesed");
    }

    resolveCostAndInteraction(payload.effect, state.hero, true);

    if ('selectorOrigin' in payload.effect && !payload.effect.selectorOrigin) {
      payload.effect.selectorOrigin = state.hero.position!;
    }

    const effects = state.getAllEffects();
    if (payload.effect.effectName === EffectName.DealDamageByWeapon) {
      resolveDealDamageByWeapon(state.hero, state.board, state.heroInventory, payload, effects);
    }

    if (payload.effect.effectName === EffectName.DealDamage) {
      resolveDealDamage(state.board, payload, effects);
    }

    if (payload.effect.effectName === EffectName.SpawnActor) {
      resolveSpawnActor(state.board, payload)
    }

    if (payload.effect.effectName === EffectName.ModifyPosition) {
      resolveModifyPosition(state.board, payload)
    }

    if (payload.effect.effectName === EffectName.ModifyStats) {
      resolveModifyStats(state.board, payload)
    }

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

  try {
    resolveCostAndInteraction(payload.effect, { ...state.hero }, true);
  } catch {
    return false
  }

  return true;
}
