import { IActor } from "../actors/actor";
import { ActorType } from "../actors/actor.constants";


export interface IDungeonDeck extends IActor {
  cardsToUtilize: string[];
  utilizedCards: string[];
  drawPerTurn: number;
}

export interface IDungeonCard<T> {
  id: string;
  name: string;
  effects: Array<T>;
}

export class DungeonDeck implements IDungeonDeck {
  
  id!: string;
  name!: string;
  cardsToUtilize!: string[];
  utilizedCards!: string[];
  actorType!: ActorType.DungeonDeck;
  groupId!: string;
  drawPerTurn!: number;
  
  constructor(data: Omit<IDungeonDeck, "actorType">) {}


  takeCards(drawPerTurn: number): IDungeonCard<unknown>[] {
    return []
  }

  shuffleInUtilizedTiles() {
    
  }

  addCardsToUtilized(cards: IDungeonCard<unknown>[]) {
    throw new Error("Method not implemented.");
  }
}