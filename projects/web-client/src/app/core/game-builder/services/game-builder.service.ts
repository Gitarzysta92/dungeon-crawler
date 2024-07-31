import { Injectable } from "@angular/core";
import { GameBuilderState } from "../state/game-builder.state";
import { IDENTITY_STEP_NAME } from "../constants/game-builder.constants";
import { DataFeedService } from "../../game-data/services/data-feed.service";
import { IAdventureGameplayState } from "../../adventure/gameplay/adventure-gameplay.interface";
import { AdventureGameplayBuilder } from "../../adventure/gameplay/adventure-gameplay.builder";
import { AdventureGameplayFactory } from "../../adventure/gameplay/adventure-gameplay.factory";
import { IHeroRecipe } from "@game-logic/gameplay/modules/heroes/builder/hero-builder.interface";


@Injectable()
export class GameBuilderService {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _adventureGameplayBuilder: AdventureGameplayBuilder,
    private readonly _adventureGameplayFactory: AdventureGameplayFactory,
  ) { }

  public async createGame(process: GameBuilderState): Promise<IAdventureGameplayState> {
    const recipe = Object.fromEntries(process.steps.filter(s => !('data' in s)).map(s => [s.stepName, (s.items as any).find(i => i.isSelected)])) as IHeroRecipe;
    const identityData = (process.steps.find(s => s.stepName === IDENTITY_STEP_NAME && 'data' in s) as any).data;
    const adventureDeclaration = await this._adventureGameplayBuilder.createGame(identityData.name, identityData.avatarUrl, recipe);
    return await this._adventureGameplayFactory.initializeAdventureGameplay(adventureDeclaration, this._dataFeed);
  }
}