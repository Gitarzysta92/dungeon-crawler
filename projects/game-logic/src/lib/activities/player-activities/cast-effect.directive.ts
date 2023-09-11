import { IEffectBase } from "../../features/effects/effects.interface";
import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { resolveCostAndInteraction } from "../../features/interactions/interactions";
import { AdventureActivityName } from "../constants/activity-name";
import { IItem } from "../../features/items/items.interface";
import { CastEffectPayload } from "../../features/effects/effect-commons.interface";
import { resolveEffect } from "../../features/effects/effect-commons";



export const castEffect = (payload: CastEffectPayload): IDispatcherDirective =>
  (state: DungeonState, feed: IGameFeed) => {
   
    const effectItemIds = state.heroInventory.getAllItems<IEffectBase & IItem>()
      .filter(i => !!i.effectName)
      .map(i => i.id);
    
    const allowedEffectIds = state.heroPreparedSpellAndAbilityIds.concat(effectItemIds);
    if (!allowedEffectIds.some(id => payload.effect.id === id)) {
      throw new Error("Effect not possesed");
    }

    resolveCostAndInteraction(payload.effect, state.hero, true);

    if (!payload.effect.selectorOrigin) {
      payload.effect.selectorOrigin = state.hero.position!
    }

    const effects = state.getAllEffects();
    resolveEffect(state.board, payload, effects, state.hero);

    return [{
      name: AdventureActivityName.BuyItem,
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
    resolveCostAndInteraction(payload.effect, state.hero, true);
  } catch {
    return false
  }

  return true;
}
