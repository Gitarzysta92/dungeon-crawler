import { IActor, IBasicStats } from "../actors/actors.interface";
import { Board } from "../board/board";
import { Inventory } from "../items/inventory";
import { resolveDealDamageByWeapon, resolveDealDamage } from "./deal-damage/deal-damage.effect";
import { IEffect, IEffectPayload } from "./effects-commons.interface";
import { EffectName } from "./effects.constants";
import { resolveModifyPosition } from "./modify-position/modify-position.effect";
import { resolveModifyStats } from "./modify-statistics/modify-statistics.effect";
import { resolveSpawnActor } from "./spawn-actor/spawn-actor.effect";
import { resolveTriggerEffect } from "./trigger-effect/trigger-effect.effect";

export function resolveEffect(
  effect: IEffect,
  effectData: IEffectPayload,
  caster: IActor & IBasicStats,
  board: Board,
  heroInventory: Inventory,
  effects: IEffect[]
) {
  if (effect.effectName === EffectName.DealDamageByWeapon) {
    resolveDealDamageByWeapon(caster, board, heroInventory, { effect, effectData }, effects);
  }

  if (effect.effectName === EffectName.DealDamage) {
    //TO DO: Add outlets to fourth param
    resolveDealDamage(board, { effect, effectData }, effects, []);
  }

  if (effect.effectName === EffectName.SpawnActor) {
    resolveSpawnActor(board, { effect, effectData })
  }

  if (effect.effectName === EffectName.ModifyPosition) {
    resolveModifyPosition(board, { effect, effectData })
  }

  if (effect.effectName === EffectName.ModifyStats) {
    resolveModifyStats(board, { effect, effectData })
  }

  if (effect.effectName === EffectName.TriggerEffect && effectData.effectName === EffectName.TriggerEffect) {
    resolveTriggerEffect(effectData.payload)
  }
}