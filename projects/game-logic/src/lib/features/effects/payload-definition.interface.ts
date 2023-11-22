import { IDealDamagePayload, IDealDamageByWeaponPayload, IDealDamageByWeapoonDefinition, IDealDamageDefinition } from "./deal-damage/deal-damage.interface";
import { IDeckInteractionPayload } from "./dungeon-deck-interaction/dungeon-deck-interaction.interface";
import { IModifyPositionPayload } from "./modify-position/modify-position.interface";
import { IModifyStatsPayload } from "./modify-statistics/modify-statistics.interface";
import { ISpawnActorDefinition, ISpawnActorPayload } from "./spawn-actor/spawn-actor.interface";
import { ITriggerActorEffectPayload } from "./trigger-actor-effect/trigger-actor-effect.interface";

export type IEffectDefinition = |
  IDealDamageDefinition |
  IDealDamageByWeapoonDefinition |
  IDeckInteractionPayload |
  IModifyStatsPayload |
  IModifyPositionPayload |
  ISpawnActorDefinition |
  ITriggerActorEffectPayload;

  


export type IEffectPayload = |
  IDealDamagePayload |
  IDealDamageByWeaponPayload |
  IDeckInteractionPayload |
  IModifyStatsPayload |
  IModifyPositionPayload |
  ISpawnActorPayload |
  ITriggerActorEffectPayload;

  