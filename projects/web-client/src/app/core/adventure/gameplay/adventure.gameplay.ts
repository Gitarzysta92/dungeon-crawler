import { AdventureGameplay as Ag } from "@game-logic/gameplay/modules/adventure/adventure.gameplay";
import { IDungeonGameplayDeclaration } from "@game-logic/gameplay/modules/dungeon/dungeon.interface";
import { ISerializable } from "@game-logic/lib/infrastructure/extensions/json-serializer";
import { IGameMetadata } from "../../game-builder/interfaces/game-metadata.interface";
import { IPersistableGameState } from "../../game-persistence/interfaces/persisted-game.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiData, IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { IGame, IGameplayEntity } from "../../game/interfaces/game.interface";
import { PlayerType } from "@game-logic/lib/base/player/players.constants";
import { ICommand } from "../../game/interfaces/command.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IAdventureGameplayDeclaration } from "./adventure-gameplay.interface";
import { IAdventureGameplayEntity } from "@game-logic/gameplay/modules/adventure/adventure.interface";
import { IDungeonCrawler } from "@game-logic/gameplay/modules/dungeon/mixins/dungeon-crawler/dungeon-crawler.interface";
import { IPawn } from "@game-logic/lib/base/pawn/pawn.interface";
import { IBoardTraveler } from "@game-logic/gameplay/modules/board-areas/entities/board-traveler/board-traveler.interface";

export class AdventureGameplay extends Ag implements
  IGame,
  ISerializable<IAdventureGameplayDeclaration>,
  IGameMetadata,
  IPersistableGameState,
  INarrativeMedium,
  IUiMedium,
  ISceneMediumDeclaration {
  
  isMixin: true;
  gameVersion: string;
  persistedGameDataId: string;
  narrative: { name: string; description: string; };
  isNarrationMedium: true;
  uiData: IUiData;
  isUiMedium: true;
  isSceneMedium: true;
  scene: { composerDeclarations: ISceneComposerDefinition<unknown>[]; };
  public get entities() { return super.entities as Array<IGameplayEntity & IAdventureGameplayEntity> };
  get humanPlayer() { return this.players.find(p => p.playerType === PlayerType.Human) }

  public async hydrate(
    data: IAdventureGameplayDeclaration & { scene: { composerDeclarations: ISceneComposerDefinition<unknown>[]; } }
  ): Promise<void> {
    this.scene = data.scene;
    await super.hydrate(data);
  }

  public getCurrentPlayerSelectedPawn<T extends IPawn & IBoardTraveler>() {
    return super.getCurrentPlayerSelectedPawn<T & any>()
  }

  public getAvailableActivities(): (ICommand & IInteractableMedium)[] {
    return super.getAvailableActivities(this.getCurrentPlayerSelectedPawn()) as (ICommand & IInteractableMedium)[]
  }

  public getInteractableAreas(): any {
    return this.entities.filter(e => e.isBoardArea && e.nestedAreas.length > 0)
  }  

  public getHumanPlayerPawn() {
    return this.getSelectedPawn(this.humanPlayer);
  }

  public toJSON(): IAdventureGameplayDeclaration {
    return Object.assign({}, {
      entities: this.entities,
      currentDay: this.currentDay,
      players: this.players,
      visitedDungeonAreaId: this.getSelectedPawn<IDungeonCrawler & IPawn>(this.humanPlayer).visitedDungeonId
    }) as any
  }
}