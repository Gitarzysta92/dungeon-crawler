import { IDealDamagePayload, IDealDamageDefinition } from "./deal-damage/deal-damage.interface";
import { IDealDamageByWeaponPayload, IDealDamageByWeapoonDefinition } from "./deal-damage/deal-damage-by-weapon.interface";
import { IDeckInteractionDefinition, IDeckInteractionPayload } from "./dungeon-deck-interaction/dungeon-deck-interaction.interface";
import { IModifyPositionDefinition, IModifyPositionPayload } from "./modify-position/modify-position.interface";
import { IModifyStatsDefinition, IModifyStatsPayload } from "./modify-statistics/modify-statistics.interface";
import { INoopDefinition, INoopPayload } from "./noop/noop.interface";
import { ISpawnActorDefinition, ISpawnActorPayload } from "./spawn-actor/spawn-actor.interface";
import { ITriggerActorEffectDefinition, ITriggerActorEffectPayload } from "./trigger-actor-effect/trigger-actor-effect.interface";

export type IEffectDefinition = |
  IDealDamageDefinition |
  IDealDamageByWeapoonDefinition |
  IDeckInteractionDefinition |
  IModifyStatsDefinition |
  IModifyPositionDefinition |
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
  ITriggerActorEffectPayload |
  INoopPayload;