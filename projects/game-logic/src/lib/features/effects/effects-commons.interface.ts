import { IBasicStats } from "../actors/actors.interface";
import { IBoardSelector } from "../board/board.interface";
import { IReusable, IDisposable } from "../interactions/interactions.interface";
import { IDealDamage, IDealDamageByWeapoon, IDealDamageByWeaponPayload, IDealDamagePayload } from "./deal-damage/deal-damage.interface";
import { IDungeonDeckInteraction, IDeckInteraction, IDeckInteractionPayload } from "./dungeon-deck-interaction/dungeon-deck-interaction.interface";
import { INoopEffect } from "./effects.interface";
import { IModifyPosition, IModifyPositionPayload } from "./modify-position/modify-position.interface";
import { IModifyStats, IModifyStatsPayload } from "./modify-statistics/modify-statistics.interface";
import { ISpawnActor, ISpawnActorPayload } from "./spawn-actor/spawn-actor.interface";
import { ITriggerEffect, ITriggerEffectPayload } from "./trigger-effect/trigger-effect.interface";

type AggregatedEffects = INoopEffect |
  IDealDamage |
  IDealDamageByWeapoon |
  IModifyStats<IBasicStats> |
  IModifyPosition |
  ISpawnActor |
  ITriggerEffect;

export type IEffect =
    AggregatedEffects |
    AggregatedEffects & IBoardSelector |
    AggregatedEffects & (IReusable | IDisposable) & IBoardSelector |
    IDungeonDeckInteraction<IDeckInteraction> & (IReusable | IDisposable);

export type IEffectPayload = |
  IDealDamagePayload |
  IDealDamageByWeaponPayload |
  IDeckInteractionPayload |
  IModifyStatsPayload |
  IModifyPositionPayload |
  ISpawnActorPayload |
  ITriggerEffectPayload;

  

export interface CastEffectPayload {
  effect: IEffect;
  effectData?: IEffectPayload;
}