import { IDealDamagePayload, IDealDamageDefinition } from "./deal-damage/deal-damage.interface";
import { IDealDamageByWeaponPayload, IDealDamageByWeapoonDefinition } from "./deal-damage/deal-damage-by-weapon.interface";
import { IDeckInteractionPayload } from "./dungeon-deck-interaction/dungeon-deck-interaction.interface";
import { IModifyPositionPayload } from "./modify-position/modify-position.interface";
import { IModifyStatsPayload } from "./modify-statistics/modify-statistics.interface";
import { INoopDefinition } from "./noop/noop.interface";
import { ISpawnActorDefinition, ISpawnActorPayload } from "./spawn-actor/spawn-actor.interface";
import { ITriggerActorEffectDefinition, ITriggerActorEffectPayload } from "./trigger-actor-effect/trigger-actor-effect.interface";

export type IEffectDefinition = |
  IDealDamageDefinition |
  IDealDamageByWeapoonDefinition |
  IDeckInteractionPayload |
  IModifyStatsPayload |
  IModifyPositionPayload |
  ISpawnActorDefinition |
  ITriggerActorEffectDefinition |
  INoopDefinition;

  


export type IEffectPayload = |
  IDealDamagePayload |
  IDealDamageByWeaponPayload |
  IDeckInteractionPayload |
  IModifyStatsPayload |
  IModifyPositionPayload |
  ISpawnActorPayload |
  ITriggerActorEffectPayload;

  