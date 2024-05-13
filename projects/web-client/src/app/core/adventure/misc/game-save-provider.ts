import { IHero } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";
import { IGameSaveDataProvider } from "../../game-persistence/interfaces/persisted-game.interface";
import { IVisualMedium, IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IAdventureGameplayState } from "../interfaces/adventure-gameplay-state.interface";
import { IAdventureStateDeclaration } from "@game-logic/gameplay/modules/adventure/mixins/adventure-state/adventure-state.interface";

export class GameSaveProvider implements IGameSaveDataProvider {
  heroOccupiedAreaId: string;
  heroAvatar: IVisualUiData;
  heroLevel: number;
  heroName: string;
  playerId: string;
  gameId: string;
  constructor(gameplay: IAdventureStateDeclaration) {
    const hero = (gameplay.entities as Array<IHero & IVisualMedium & INarrationMedium>).find(e => e.isHero);
    this.heroOccupiedAreaId = hero.occupiedAreaId;
    this.heroAvatar = hero.visual.ui;
    this.heroName = hero.narrative.name;
    this.playerId = gameplay.player.id;
    this.gameId = gameplay.id;
  }
}