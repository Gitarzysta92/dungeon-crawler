import { IPlayer } from "../../../../lib/base/player/players.interface";
import { IAdventureGameplayStateDto } from "../../../state/adventure/adventure-gameplay.interface";
import { IHeroDeclaration } from "../../heroes/entities/hero/hero.interface";
import { IAdventureDataFeed } from "../adventure.interface";
import { v4 } from 'uuid';

export class AdventureBuilder {

  constructor(
    private readonly _dataFeed: IAdventureDataFeed
  ) {}

  public async build(
    player: IPlayer,
    hero: IHeroDeclaration,
  ): Promise<IAdventureGameplayStateDto> { 
    const adventureTemplate = await this._dataFeed.getAdventureGameplayTemplate() as IAdventureGameplayStateDto
    adventureTemplate.id = v4();
    adventureTemplate.player = player;
    adventureTemplate.entities.push(hero);
    return adventureTemplate;
  }
  
}

