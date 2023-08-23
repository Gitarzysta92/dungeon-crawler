import { ActorType } from "../actors/actors.constants";
import { IEffectBase } from "../effects/effects.interface";
import { IDungeonDeck, IDungeonCard } from "./dungeon-deck.interface";


export class DungeonDeck implements IDungeonDeck {
  
  id: string;
  cardsToUtilize: IDungeonCard<unknown>[];
  utilizedCards: IDungeonCard<unknown>[];
  actorType: ActorType.DungeonDeck = ActorType.DungeonDeck;
  groupId: string;
  drawPerTurn: number;
  effects: IEffectBase[];

  constructor(data: Omit<IDungeonDeck, "actorType" | "utilizedCards">) {
    this.id = data.id;
    this.cardsToUtilize = data.cardsToUtilize;
    this.utilizedCards = [];
    this.groupId = data.groupId!;
    this.drawPerTurn = data.drawPerTurn;
    this.effects = data.effects;
  }

  takeCards(drawPerTurn: number): IDungeonCard<unknown>[] {
    return []
  }

  shuffleInUtilizedTiles() {
    
  }

  addCardsToUtilized(cards: IDungeonCard<unknown>[]) {
    throw new Error("Method not implemented.");
  }
}