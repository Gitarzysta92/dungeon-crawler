import { v4 } from 'uuid';
import { IPlayerDeclaration } from "../../../../lib/base/player/players.interface";
import { IHeroDeclaration } from "../../heroes/mixins/hero/hero.interface";
import { IAdventureGameplayDeclaration } from '../adventure.interface';


export class AdventureBuilder {

  constructor() {}

  public static build(
    player: IPlayerDeclaration,
    hero: IHeroDeclaration,
    adventure: IAdventureGameplayDeclaration
  ): IAdventureGameplayDeclaration { 
    adventure.id = v4();
    adventure.entities.push(hero);


    return Object.assign({
      isAdventureState: true as const,
      players: [player],
      currentDay: 0,
      visitedDungeonAreaId: null
    }, adventure)
  }
  
}

