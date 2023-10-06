import { IBoardSelector } from "../board/board.interface";
import { IReusable, IDisposable } from "../interactions/interactions.interface";
import { IDealDamage, IDealDamageByWeapoon, IDealDamageByWeaponPayload, IDealDamagePayload } from "./deal-damage.interface";
import { IDungeonDeckInteraction, IDeckInteraction, IDeckInteractionPayload } from "./dungeon-deck-interaction.interface";
import { INoopEffect } from "./effects.interface";
import { IModifyPosition, IModifyPositionPayload } from "./modify-position.interface";
import { IModifyStats, IModifyStatsPayload } from "./modify-statistics.interface";
import { ISpawnActor, ISpawnActorPayload } from "./spawn-actor.interface";

export type IEffect =
  (INoopEffect |
    IDealDamage |
    IDealDamageByWeapoon |
    IModifyStats<unknown> |
    IModifyPosition |
    IDungeonDeckInteraction<IDeckInteraction> |
    ISpawnActor) & (IReusable | IDisposable) & IBoardSelector;

export type IEffectPayload = |
  IDealDamagePayload |
  IDealDamageByWeaponPayload |
  IDeckInteractionPayload |
  IModifyStatsPayload |
  IModifyPositionPayload |
  ISpawnActorPayload;

  

export interface CastEffectPayload {
  effect: IEffect;
  effectData?: IEffectPayload;
}