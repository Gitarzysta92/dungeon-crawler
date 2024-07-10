import { DungeonGameplay as Dg } from "@game-logic/gameplay/modules/dungeon/dungeon.gameplay";
import { IDungeonGameplayDeclaration } from "@game-logic/gameplay/modules/dungeon/dungeon.interface";
import { ISerializable } from "@game-logic/lib/infrastructure/extensions/json-serializer";
import { IGameMetadata } from "../../game-builder/interfaces/game-metadata.interface";
import { IPersistableGameState } from "../../game-persistence/interfaces/persisted-game.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiData, IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { IGameplayEntity } from "./dungeon-gameplay.interface";
import { IGame } from "../../game/interfaces/game.interface";
import { PlayerType } from "@game-logic/lib/base/player/players.constants";
import { ICommand } from "../../game/interfaces/command.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";

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
  
  isMixin: true;
  gameVersion: string;
  persistedGameDataId: string;
  narrative: { name: string; description: string; };
  isNarrationMedium: true;
  uiData: IUiData;
  isUiMedium: true;
  isSceneMedium: true;
  scene: { composerDeclarations: ISceneComposerDefinition<unknown>[]; };
  public get entities() { return super.entities as IGameplayEntity[] };

  public async hydrate(
    s: IDungeonGameplayDeclaration & { scene: { composerDeclarations: ISceneComposerDefinition<unknown>[]; } }
  ): Promise<void> {
    this.scene = s.scene;
    super.hydrate(s);
  }

  public getAvailableActivities(): (ICommand & IInteractableMedium)[] {
    return [] 
  }

  public getHumanPlayerPawn() {
    return this.getSelectedPawn(this.humanPlayer);
  }

  public toJSON(): IDungeonGameplayDeclaration {
    return Object.assign({}, {
      entities: this.entities,
      players: this.players,
      currentPlayerId: this.currentPlayerId,
      order: this.order,
      turn: this.turn,
      round: this.round
    }) as any
  }
}