
import { ICard } from "../framework/modules/cards-deck/cards-deck.interface";
import { IEffectPayloadProvider } from "../framework/modules/effect/effect-resolver/effect-resolver.interface";
import { IEffect } from "../framework/modules/effect/effect.interface";
import { DungeonGameplay } from "../dungeon/dungeon-gameplay";

export interface IDungeonDeckInteractionHandler extends IEffectPayloadProvider {
  chooseCardToCast: (state: DungeonGameplay) => ICard<IEffect>;
}


export interface IDungeonPlayerInteractionHandler extends IEffectPayloadProvider {
  chooseEffectToCast: (state: DungeonGameplay) => IEffect | null;
}