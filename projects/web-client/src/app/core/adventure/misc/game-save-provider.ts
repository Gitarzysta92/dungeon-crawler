import { IHero } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";
import { IGameSaveDataProvider } from "../../game-persistence/interfaces/persisted-game.interface";
import { IUiMedium, IUiData } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IAdventureGameplayDeclaration } from "@game-logic/gameplay/modules/adventure/adventure.interface";


export class GameSaveProvider implements IGameSaveDataProvider {
  heroOccupiedAreaId: string;
  heroAvatar: IUiData;
  heroLevel: number;
  heroName: string;
  playerId: string;
  gameId: string;
  constructor(gameplay: IAdventureGameplayDeclaration) {
    const hero = (gameplay.entities as Array<IHero & IUiMedium & INarrativeMedium>).find(e => e.isHero);
    this.heroAvatar = hero.uiData;
    this.heroName = hero.narrative.name;
    this.playerId = hero.playerId;
    this.gameId = gameplay.id;
  }
}