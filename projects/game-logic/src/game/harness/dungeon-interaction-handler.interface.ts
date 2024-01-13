import { ICard } from "../../lib/features/cards-deck/cards-deck.interface";
import { IEffectPayloadProvider } from "../../lib/features/effects/commons/effect-resolver/effect-resolver.interface";
import { IEffect } from "../../lib/features/effects/resolve-effect.interface";
import { DungeonGameplayState } from "../../lib/gameplay/dungeon/dungeon-global-state";

export interface IDungeonDeckInteractionHandler extends IEffectPayloadProvider {
  chooseCardToCast: (state: DungeonGameplayState) => ICard<IEffect>;
}


export interface IDungeonPlayerInteractionHandler extends IEffectPayloadProvider {
  chooseEffectToCast: (state: DungeonGameplayState) => IEffect | null;
}