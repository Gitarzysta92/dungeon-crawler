import { IBasicStats } from "../actors/actors.interface";
import { IDealDamageByWeaponSignature } from "./deal-damage/deal-damage-by-weapon.interface";
import { IDealDamageSignature } from "./deal-damage/deal-damage.interface";
import { IModifyPositionSignature } from "./modify-position/modify-position.interface";
import { IModifyStatsSignature } from "./modify-statistics/modify-statistics.interface";
import { INoopSignature } from "./noop/noop.interface";
import { ISpawnActorSignature } from "./spawn-actor/spawn-actor.interface";
import { ITriggerActorSignature } from "./trigger-actor-effect/trigger-actor-effect.interface";

export type IEffectSignature =
  IDealDamageSignature |
  IDealDamageByWeaponSignature |
  IModifyPositionSignature |
  IModifyStatsSignature<IBasicStats> |
  INoopSignature |
  ISpawnActorSignature |
  ITriggerActorSignature