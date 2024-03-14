import { DungeonGameplay } from "../../gameplay/dungeon/state/dungeon-gameplay";
import { ICard } from "../../lib/modules/cards-deck/cards-deck.interface";
import { IEffect } from "../../lib/modules/effects/entities/effect.interface";


export interface IDungeonDeckInteractionHandler {
  chooseCardToCast: (state: DungeonGameplay) => ICard;
}


export interface IDungeonPlayerInteractionHandler {
  chooseEffectToCast: (state: DungeonGameplay) => IEffect | null;
}