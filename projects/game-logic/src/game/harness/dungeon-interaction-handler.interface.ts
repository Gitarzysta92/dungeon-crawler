import { IDungeonCard } from "../../lib/features/dungeon/dungeon-deck.interface";
import { IEffectPayloadProvider } from "../../lib/features/effects/commons/payload-resolver/effect-resolver.interface";
import { IEffect } from "../../lib/features/effects/resolve-effect.interface";
import { DungeonState } from "../../lib/states/dungeon-state";

export interface IDungeonDeckInteractionHandler extends IEffectPayloadProvider {
  chooseCardToCast: (state: DungeonState) => IDungeonCard<IEffect>;
}


export interface IDungeonPlayerInteractionHandler extends IEffectPayloadProvider {
  chooseEffectToCast: (state: DungeonState) => IEffect | null;
}