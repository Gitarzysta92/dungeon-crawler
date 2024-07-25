import { DungeonGameplay as Dg } from "@game-logic/gameplay/modules/dungeon/dungeon.gameplay";
import { IDungeonGameplayEntity } from "@game-logic/gameplay/modules/dungeon/dungeon.interface";
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
import { IDungeonGameplayDeclaration } from "./dungeon-gameplay.interface";
import { IBoardAssignment } from "@game-logic/lib/modules/board/entities/board-object/board-object.interface";
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { IBoardField } from "@game-logic/lib/modules/board/entities/board-field/board-field.interface";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";

export class DungeonGameplay extends Dg implements
  IGame,
  ISerializable<IDungeonGameplayDeclaration>,
  IGameMetadata,
  IPersistableGameState,
  INarrativeMedium,
  IUiMedium,
  ISceneMediumDeclaration
{
  get humanPlayer() { return this.players.find(p => p.playerType === PlayerType.Human) }
  
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

  public async hydrate(data: IDungeonGameplayDeclaration): Promise<void> {
    this.scene = data.scene;
    this.gameVersion = data.gameVersion;
    this.persistedGameDataId = data.persistedGameDataId;
    this.narrative = data.narrative;
    this.id = data.id;
    this.spawnPoints = data.spawnPoints;
    this.currentPlayerId = data.currentPlayerId;
    await super.hydrate(data);
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

  public toJSON(): IDungeonGameplayDeclaration {
    return {
      entities: this.entities,
      players: this.players,
      order: this.order,
      currentPlayerId: this.currentPlayerId,
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