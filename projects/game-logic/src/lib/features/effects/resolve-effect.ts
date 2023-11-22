import { IActor, IBasicStats } from "../actors/actors.interface";
import { Board } from "../board/board";
import { Inventory } from "../items/inventory";
import { resolveDealDamageByWeapon, resolveDealDamage } from "./deal-damage/deal-damage.effect";
import { IDealDamageByWeaponPayload, IDealDamagePayload } from "./deal-damage/deal-damage.interface";
import { EffectName } from "./effects.constants";
import { resolveModifyPosition } from "./modify-position/modify-position.effect";
import { resolveModifyStats } from "./modify-statistics/modify-statistics.effect";
import { IEffectPayload } from "./payload-definition.interface";
import { IEffect } from "./resolve-effect.interface";
import { resolveSpawnActor } from "./spawn-actor/spawn-actor.effect";
import { resolveTriggerActorEffect } from "./trigger-actor-effect/trigger-actor-effect.effect";

export function resolveEffect(
  payload: IEffectPayload,
  board: Board,
  heroInventory: Inventory,
  effects: IEffect[]
) {
  if (payload.effectName === EffectName.DealDamageByWeapon && 'selectorType' in payload.effect) {
    resolveDealDamageByWeapon(payload, board, heroInventory, effects);
  }

  if (payload.effectName === EffectName.DealDamage ) {
    //TO DO: Add outlets to fourth param
    resolveDealDamage(payload, board, effects);
  }

  if (payload.effectName === EffectName.SpawnActor) {
    resolveSpawnActor(payload, board);
  }

  if (payload.effectName === EffectName.ModifyPosition) {
    resolveModifyPosition(payload, board);
  }

  if (payload.effectName === EffectName.ModifyStats) {
    resolveModifyStats(payload, board);
  }

  if (payload.effectName === EffectName.TriggerEffect) {
    resolveTriggerActorEffect(payload, board, heroInventory, effects);
  }
}