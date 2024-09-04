import { Injectable, Injector } from '@angular/core';
import { IPawn } from '@game-logic/lib/base/pawn/pawn.interface';
import { IDeckBearer } from '@game-logic/lib/modules/cards/entities/deck-bearer/deck-bearer.interface';
import { DungeonArtificialIntelligenceService } from '../../game-ai/services/dungeon-artificial-intelligence.service';
import { PlayerType } from '@game-logic/lib/base/player/players.constants';
import { PLAY_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { CommandService } from '../../game/services/command.service';
import { UiInteractionService } from '../../game-ui/services/ui-interaction.service';
import { ICard } from '@game-logic/lib/modules/cards/entities/card/card.interface';
import { DungeonStateStore } from '../stores/dungeon-state.store';
import { ICommand, ICommandExecutionController } from '../../game/interfaces/command.interface';
import { IProcedureController } from '@game-logic/lib/base/procedure/procedure.interface';
import { IDistinguishableData, IGatheredData, IGatheringContext, IGatheringController } from '@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface';
import { ACTOR_DATA_TYPE, SOURCE_ACTOR_DATA_TYPE } from '@game-logic/lib/modules/actors/actors.constants';
import { ROTATION_DATA_TYPE, FIELD_DATA_TYPE, PATH_DATA_TYPE } from '@game-logic/lib/modules/board/board.constants';
import { IBoardObjectRotation } from '@game-logic/lib/modules/board/board.interface';
import { IBoardField } from '@game-logic/lib/modules/board/entities/board-field/board-field.interface';
import { IActor } from '@game-logic/lib/modules/actors/entities/actor/actor.interface';
import { IDungeonComputerPlayer } from '../mixins/dungeon-computer-player/dungeon-computer-player.interface';
import { OpponentPlayedCardAcknowledgementComponent } from '../components/opponent-played-card-acknowledgement/opponent-played-card-acknowledgement.component';
import { IPath, IPathSegment } from '@game-logic/lib/modules/board/pathfinding/pathfinding.interface';


@Injectable()
export class ComputerPlayerService implements IProcedureController, IGatheringController, ICommandExecutionController {

  constructor( 
    private readonly _dungeonAiService: DungeonArtificialIntelligenceService,
    private readonly _commandsService: CommandService,
    private readonly _uiService: UiInteractionService,
  ) { }

  public selectCommandType(types: { [key: string]: ICommand[]; }): Promise<ICommand[]> {
    throw new Error('Method not implemented.');
  }

  public selectCommand(commands: ICommand[]): Promise<ICommand> {
    throw new Error('Method not implemented.');
  }

  public isComputerTurn(s: DungeonStateStore): boolean {
    return s.currentState.currentPlayer.playerType === PlayerType.Computer
  }

  public async makeTurn(player: IDungeonComputerPlayer, store: DungeonStateStore): Promise<void> {
    if (!this.isComputerTurn(store)) {
      throw new Error("Cannot handle non computer turn");
    }
    if (!store.currentState.currentPlayer.startedTurn) {
      await player.startTurn();
    }
    const pawn = store.currentState.getCurrentPlayerSelectedPawn<IPawn & IDeckBearer>();
    const cardsToUtilize = [...this._dungeonAiService.determineCardsOrder(pawn.hand.pile)];
    while (cardsToUtilize.length !== 0) {
      const card = cardsToUtilize.shift();
      const playCardActivity = card.activities.find(a => a.id === PLAY_CARD_ACTIVITY) as ICommand;
      if (!playCardActivity) {
        throw new Error("Given card has not playcard activity");
      }

      await this._uiService.requestAcknowledgement(OpponentPlayedCardAcknowledgementComponent, { card });
      await this._commandsService.executeCommand(playCardActivity, store, this)
    }

    await player.finishTurn();
  }

  public async listenForEarlyResolve(s: boolean): Promise<boolean> {
    return false;
  }

  public gather(context: IGatheringContext): Promise<IGatheredData<IDistinguishableData>> {
    if (context.dataType === ACTOR_DATA_TYPE) {
      return this._dungeonAiService.collectActorTypeData(context as IGatheringContext<IActor>)
    }
    if (context.dataType === ROTATION_DATA_TYPE) {
      return this._dungeonAiService.collectRotationTypeData(context as IGatheringContext<IBoardObjectRotation>)
    }
    if (context.dataType === FIELD_DATA_TYPE) {
      return this._dungeonAiService.collectFieldTypeData(context as IGatheringContext<IBoardField>)
    }
    if (context.dataType === SOURCE_ACTOR_DATA_TYPE) {
      return this._dungeonAiService.collectSourceActorTypeData(context as IGatheringContext<IActor>)
    }
    if (context.dataType === PATH_DATA_TYPE) {
      return this._dungeonAiService.collectPathTypeData(context as IGatheringContext<IPathSegment>)
    }
  }  


  private _createAcknowledgementContent(card: ICard): any {

  }

} 