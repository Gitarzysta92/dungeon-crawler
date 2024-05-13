import { DungeonGameplayLogicState } from "../../../gameplay/modules/dungeon/mixins/dungeon-state/dungeon-state.factory";
import { ICard } from "../../../lib/modules/cards-deck/entities/deck/deck.interface";
import { IEffect } from "../../../lib/modules/effects/entities/effect.interface";


export interface IDungeonDeckInteractionHandler {
  chooseCardToCast: (state: DungeonGameplayLogicState) => ICard;
}


export interface IDungeonPlayerInteractionHandler {
  chooseEffectToCast: (state: DungeonGameplayLogicState) => IEffect | null;
}