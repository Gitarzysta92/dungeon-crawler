import { Injectable } from "@angular/core";
import { DataFeedService } from "../../game-data/services/data-feed.service";
import { IAdventureGameplayState } from "../../adventure/gameplay/adventure-gameplay.interface";
import { AdventureGameplayBuilder } from "../../adventure/gameplay/adventure-gameplay.builder";
import { AdventureGameplayFactory } from "../../adventure/gameplay/adventure-gameplay.factory";
import { IPickerDeclaration } from "../../game-data/constants/hero-picker.data";


@Injectable()
export class GameBuilderService {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _adventureGameplayBuilder: AdventureGameplayBuilder,
    private readonly _adventureGameplayFactory: AdventureGameplayFactory,
  ) { }

  public async createGame(hero: IPickerDeclaration): Promise<IAdventureGameplayState> {
    const heroTemplate = await this._dataFeed.getHeroTemplate(hero.id);
    if (!heroTemplate) {
      throw new Error(`Cannot find hero template for given id ${hero.id}`)
    }
    const adventureDeclaration = await this._adventureGameplayBuilder.createGame(heroTemplate);
    return await this._adventureGameplayFactory.initializeAdventureGameplay(adventureDeclaration, this._dataFeed);
  }
}