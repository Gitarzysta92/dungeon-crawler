import { IPlayer } from "../../../../lib/base/player/players.interface";
import { IHeroDeclaration } from "../../heroes/mixins/hero/hero.interface";
import { v4 } from 'uuid';
import { IAdventureMap } from "../mixins/adventure-map/adventure-map.interface";
import { IAdventureStateDeclaration } from "../mixins/adventure-state/adventure-state.interface";

export class AdventureBuilder {

  constructor() {}

  public static build(
    player: IPlayer,
    hero: IHeroDeclaration,
    adventure: IAdventureMap
  ): IAdventureStateDeclaration { 
    adventure.id = v4();
    adventure.entities.push(hero);


    return Object.assign({
      isAdventureState: true as const,
      player: player,
      currentDay: 0
    }, adventure)
  }
  
}

