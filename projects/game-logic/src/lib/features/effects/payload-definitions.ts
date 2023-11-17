import { IActor, IBasicStats } from "../actors/actors.interface";
import { Board } from "../board/board";
import { Inventory } from "../items/inventory";
import { getDealDamageByWeaponPayloadDefinitions, getDealDamagePayloadDefinitions } from "./deal-damage/deal-damage.effect";
import { IPayloadDefinition } from "./effect-payload.interface";
import { IEffect } from "./effects-commons.interface";
import { EffectName } from "./effects.constants";
import { getModifyPositionPayloadDefinitions } from "./modify-position/modify-position.effect";
import { getModifyStatsPayloadDefinitions } from "./modify-statistics/modify-statistics.effect";
import { getSpawnActorPayloadDefinitions } from "./spawn-actor/spawn-actor.effect";
import { getTriggerEffectPayloadDefinitions } from "./trigger-effect/trigger-effect.effect";

export function getPaylodDefinitions(
  effect: IEffect,
  caster: IActor & IBasicStats,
  heroInventory: Inventory,
  board: Board,
  effects: IEffect[]
): IPayloadDefinition[] {
  if (effect.effectName === EffectName.DealDamageByWeapon && 'selectorType' in effect) {
    return getDealDamageByWeaponPayloadDefinitions(effect, heroInventory, board, caster);
  }

  if (effect.effectName === EffectName.DealDamage && 'selectorType' in effect) {
    return getDealDamagePayloadDefinitions(effect, board, caster);
  }

  if (effect.effectName === EffectName.SpawnActor  && 'selectorType' in effect) {
    return getSpawnActorPayloadDefinitions(effect, board, caster);
  }

  if (effect.effectName === EffectName.ModifyPosition  && 'selectorType' in effect) {
    return getModifyPositionPayloadDefinitions(effect, board, caster);
  }

  if (effect.effectName === EffectName.ModifyStats  && 'selectorType' in effect) {
    return getModifyStatsPayloadDefinitions(effect, board);
  }

  if (effect.effectName === EffectName.TriggerEffect) {
    return getTriggerEffectPayloadDefinitions(effect, effects);
  }
  
  return [];
}