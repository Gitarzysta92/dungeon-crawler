import { Board } from "../board/board";
import { Inventory } from "../items/inventory";
import { resolveDealDamageByWeapon } from "./deal-damage/deal-damage-by-weapon.effect";
import { resolveDealDamage } from "./deal-damage/deal-damage.effect";
import { EffectName } from "./effects.constants";
import { resolveModifyPosition } from "./modify-position/modify-position.effect";
import { resolveModifyStats } from "./modify-statistics/modify-statistics.effect";
import { resolveNoop } from "./noop/noop.effect";
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
  if (payload.effectName === EffectName.DealDamageByWeapon) {
    return resolveDealDamageByWeapon(payload, board, heroInventory, effects);
  }

  if (payload.effectName === EffectName.DealDamage ) {
    //TO DO: Add outlets to fourth param
    return resolveDealDamage(payload, board, effects);
  }

  if (payload.effectName === EffectName.SpawnActor) {
    return resolveSpawnActor(payload, board);
  }

  if (payload.effectName === EffectName.ModifyPosition) {
    return resolveModifyPosition(payload, board);
  }

  if (payload.effectName === EffectName.ModifyStats) {
    return resolveModifyStats(payload, board);
  }

  if (payload.effectName === EffectName.TriggerEffect) {
    return resolveTriggerActorEffect(payload, board, heroInventory, effects);
  }

  if (payload.effectName === EffectName.Noop) {
    return resolveNoop(payload);
  }
}