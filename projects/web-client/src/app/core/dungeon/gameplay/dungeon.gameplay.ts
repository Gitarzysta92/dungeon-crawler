import { DungeonGameplay as Dg } from "@game-logic/gameplay/modules/dungeon/dungeon.gameplay";
import { IDungeonGameplayConfiguration, IDungeonGameplayEntity } from "@game-logic/gameplay/modules/dungeon/dungeon.interface";
import { ISerializable } from "@game-logic/lib/infrastructure/extensions/json-serializer";
import { IGameMetadata } from "../../game-builder/interfaces/game-metadata.interface";
import { IPersistableGameState } from "../../game-persistence/interfaces/persisted-game.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiData, IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { IGameplay, IGameplayEntity } from "../../game/interfaces/game.interface";
import { PlayerType } from "@game-logic/lib/base/player/players.constants";
import { ICommand } from "../../game/interfaces/command.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IDungeonGameplayState } from "./dungeon-gameplay.interface";
import { IBoardAssignment } from "@game-logic/lib/modules/board/entities/board-object/board-object.interface";
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { IBoardField } from "@game-logic/lib/modules/board/entities/board-field/board-field.interface";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { Observable } from "rxjs";
import { FINISH_TURN_EVENT, FinishTurnEvent } from "@game-logic/lib/modules/turn-based-gameplay/aspects/events/finish-turn.event";
import { IDungeonPlayer } from "@game-logic/gameplay/modules/dungeon/mixins/dungeon-player/dungeon-player.interface";
import { DefeatedEvent, DEFEATED_EVENT } from "@game-logic/lib/modules/actors/aspects/events/defeated.event";
import { DeckBearerFactory } from "@game-logic/lib/modules/cards/entities/deck-bearer/deck-bearer.factory";
import { StartTurnEvent, START_TURN_EVENT } from "@game-logic/lib/modules/turn-based-gameplay/aspects/events/start-turn.event";

export class DungeonGameplay extends Dg implements
  IGameplay,
  ISerializable<IDungeonGameplayState>,
  IGameMetadata,
  IPersistableGameState,
  INarrativeMedium,
  IUiMedium,
  ISceneMediumDeclaration
{
  get humanPlayer() { return this.players.find(p => p.playerType === PlayerType.Human) }

  public get currentPlayer() { return super.currentPlayer as IDungeonPlayer }
  public isDungeonGameplay = true as const;
  public isMixin: true;
  public gameVersion: string;
  public persistedGameDataId: string;
  public narrative: { name: string; description: string; };
  public isNarrationMedium: true;
  public uiData: IUiData;
  public isUiMedium: true;
  public isSceneMedium: true;
  public scene: { composerDeclarations: ISceneComposerDefinition<unknown>[]; };
  public spawnPoints: IBoardAssignment[];
  public get entities() { return super.entities as Array<IGameplayEntity & IDungeonGameplayEntity> };

  public async hydrate(data: IDungeonGameplayState): Promise<void> {
    this.scene = data.scene;
    this.gameVersion = data.gameVersion;
    this.persistedGameDataId = data.persistedGameDataId;
    this.narrative = data.narrative;
    this.id = data.id;
    this.spawnPoints = data.spawnPoints;
    this.currentPlayerId = data.currentPlayerId;
    await super.hydrate(data);
  }

  public startGame(cfg: IDungeonGameplayConfiguration): Promise<void> {
    return super.startGame(cfg);    
  }

  public listenForCurrentPlayer(): Observable<IDungeonPlayer> {
    return new Observable(s => {
      s.next(this.currentPlayer)
      this._eventService.listenForEvent<FinishTurnEvent>(FINISH_TURN_EVENT, () => s.next(this.currentPlayer))
    })
  }

  public initializeGameplayLoop() {
    this._eventService.listenForEvent<DefeatedEvent>(DEFEATED_EVENT, () => {
      const winners = this.getWinners();
      if (winners.length > 0) {
        this.finishGame(winners);
      }
    });
    this._eventService.listenForEvent<StartTurnEvent>(START_TURN_EVENT, e => {
      for (let pawn of this.getPawns(e.player)) {
        if (DeckBearerFactory.isDeckBearer(pawn)) {
          DeckBearerFactory.asDeckBearer(pawn).deck.drawCards();
        }
      }
    });

    this._eventService.listenForEvent<FinishTurnEvent>(FINISH_TURN_EVENT, e => {
      for (let pawn of this.getPawns(e.player)) {
        if (DeckBearerFactory.isDeckBearer(pawn)) {
          DeckBearerFactory.asDeckBearer(pawn).deck.discardCards();
        }
      }
    });
  }


  public getAvailableActivities(): (ICommand & IInteractableMedium)[] {
    return [] 
  }

  public getHumanPlayerPawn() {
    return this.getSelectedPawn(this.humanPlayer);
  }

  public getFields(items: Array<{ position: ICubeCoordinates }>): IBoardField[] {
    return items.map(i => this.entities.find((e: any) => CubeCoordsHelper.isCoordsEqual(e.position, i.position) && e.isBoardField )) as unknown as IBoardField[]
  }

  public listenAllEvents(cb: () => void) {
    this._eventService.listenAll(cb);
  }

  public toJSON(): IDungeonGameplayState {
    return {
      entities: this.entities,
      isGameStarted: this.isGameStarted,
      order: this.order,
      currentPlayerId: this.currentPlayerId,
      turn: this.turn,
      round: this.round,
      id: this.id,
      gameVersion: this.gameVersion,
      isDungeonGameplay: this.isDungeonGameplay,
      isNarrationMedium: this.isNarrationMedium,
      spawnPoints: this.spawnPoints,
      isMixin: this.isMixin,
      isSceneMedium: this.isSceneMedium,
      narrative: this.narrative,
      persistedGameDataId: this.persistedGameDataId,
      scene: this.scene
    }
  }
}