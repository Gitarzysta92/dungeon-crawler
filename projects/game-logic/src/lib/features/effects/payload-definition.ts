import { Board } from "../board/board";
import { Inventory } from "../items/inventory";
import { getDealDamageByWeaponPayloadDefinitions } from "./deal-damage/deal-damage-by-weapon.effect";
import { getDealDamagePayloadDefinition } from "./deal-damage/deal-damage.effect";
import { IPayloadDefinition } from "./commons/payload-collector/effect-payload.interface";
import { EffectName } from "./commons/effects-commons.constants";
import { getModifyPositionPayloadDefinitions } from "./modify-position/modify-position.effect";
import { getModifyStatsPayloadDefinitions } from "./modify-statistics/modify-statistics.effect";
import { getNoopPayloadDefinition } from "./noop/noop.effect";
import { IEffectDefinition } from "./payload-definition.interface";
import { IEffect } from "./resolve-effect.interface";
import { getSpawnActorPayloadDefinitions } from "./spawn-actor/spawn-actor.effect";
import { getTriggerActorEffectPayloadDefinitions } from "./trigger-actor-effect/trigger-actor-effect.effect";

export function getPaylodDefinition(
  effectData: IEffectDefinition,
  board: Board,
  inventory: Inventory,
  allEffects: IEffect[],
): IPayloadDefinition {

  if (effectData.effectName === EffectName.Noop) {
    return getNoopPayloadDefinition()
  }

  if (effectData.effectName === EffectName.DealDamageByWeapon) {
    return getDealDamageByWeaponPayloadDefinitions(effectData, inventory, board);
  }

  if (effectData.effectName === EffectName.DealDamage) {
    return getDealDamagePayloadDefinition(effectData, board);
  }

  if (effectData.effectName === EffectName.SpawnActor) {
    return getSpawnActorPayloadDefinitions(effectData, board);
  }

  if (effectData.effectName === EffectName.ModifyPosition) {
    return getModifyPositionPayloadDefinitions(effectData, board);
  }

  if (effectData.effectName === EffectName.ModifyStats) {
    return getModifyStatsPayloadDefinitions(effectData, board);
  }

  if (effectData.effectName === EffectName.TriggerEffect) {
    return getTriggerActorEffectPayloadDefinitions(effectData, allEffects, inventory, board,  getPaylodDefinition);
  }

  

  throw new Error(`Cannot find payload definition for ${effectData?.effectName}`);
}