import { IPlayer } from "../../../../lib/base/player/players.interface";
import { IAdventureGameplayStateDto } from "../../../state/adventure/adventure-gameplay.interface";
import { IHeroDeclaration } from "../../heroes/entities/hero/hero.interface";
import { IAdventureDataFeed, IAdventureTemplate } from "../adventure.interface";
import { v4 } from 'uuid';

export class AdventureBuilder {

  constructor(
    private readonly _dataFeed: IAdventureDataFeed
  ) {}

  public static build(
    player: IPlayer,
    hero: IHeroDeclaration,
    adventure: IAdventureTemplate
  ): IAdventureGameplayStateDto { 
    return {
      id: v4(),
      currentDay: 0,
      entities: [...adventure.entities, hero],
      isAdventureState: true,
      player: player
    }
  }
  
}

