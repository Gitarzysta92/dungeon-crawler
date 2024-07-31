import { v4 } from 'uuid';
import { IPlayerDeclaration } from "../../../../lib/base/player/players.interface";
import { IHeroDeclaration } from "../../heroes/mixins/hero/hero.interface";
import { IAdventureGameplayState } from '../adventure.interface';


export class AdventureBuilder {

  constructor() {}

  public static build(
    hero: IHeroDeclaration,
    adventure: IAdventureGameplayState
  ): IAdventureGameplayState { 
    adventure.id = v4();
    adventure.entities.push(hero);


    return Object.assign({
      isAdventureGameplay: true,
      currentDay: 0,
      visitedDungeonAreaId: null
    }, adventure)
  }
  
}

