import { IBasicStats } from "../actors/actors.interface";
import { IBoardSelector } from "../board/board.interface";
import { IReusable, IDisposable } from "../interactions/interactions.interface";
import { IDealDamage, IDealDamageByWeapoon } from "./deal-damage/deal-damage.interface";
import { IDungeonDeckInteraction, IDeckInteraction } from "./dungeon-deck-interaction/dungeon-deck-interaction.interface";
import { INoopEffect } from "./effects.interface";
import { IModifyPosition } from "./modify-position/modify-position.interface";
import { IModifyStats } from "./modify-statistics/modify-statistics.interface";
import { ISpawnActor } from "./spawn-actor/spawn-actor.interface";
import { ITriggerActorEffect } from "./trigger-actor-effect/trigger-actor-effect.interface";

type AggregatedEffects = INoopEffect |
  IDealDamage |
  IDealDamageByWeapoon |
  IModifyStats<IBasicStats> |
  IModifyPosition |
  ISpawnActor |
  ITriggerActorEffect |
  IDungeonDeckInteraction<IDeckInteraction>;

export type IEffect =
    AggregatedEffects |
    AggregatedEffects & IBoardSelector |
    AggregatedEffects & (IReusable | IDisposable) & IBoardSelector |
    IDungeonDeckInteraction<IDeckInteraction> & (IReusable | IDisposable);