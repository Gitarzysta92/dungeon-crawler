import { Injectable } from '@angular/core';
import { IPawn } from '@game-logic/lib/base/pawn/pawn.interface';
import { IDeckBearer } from '@game-logic/lib/modules/cards/entities/deck-bearer/deck-bearer.interface';
import { DungeonArtificialIntelligenceService } from '../../game-ai/services/dungeon-artificial-intelligence.service';
import { PlayerType } from '@game-logic/lib/base/player/players.constants';
import { PLAY_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { CommandsService } from '../../game/services/commands.service';
import { UiService } from '../../game-ui/services/ui.service';
import { ICard } from '@game-logic/lib/modules/cards/entities/card/card.interface';
import { DungeonStateStore } from '../stores/dungeon-state.store';
import { ICommand } from '../../game/interfaces/command.interface';
import { IProcedureController } from '@game-logic/lib/base/procedure/procedure.interface';
import { IDistinguishableData, IGatheredData, IGatheringContext, IGatheringController } from '@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface';
import { ACTOR_DATA_TYPE, SOURCE_ACTOR_DATA_TYPE } from '@game-logic/lib/modules/actors/actors.constants';
import { ROTATION_DATA_TYPE, FIELD_DATA_TYPE } from '@game-logic/lib/modules/board/board.constants';
import { IBoardObjectRotation } from '@game-logic/lib/modules/board/board.interface';
import { IBoardField } from '@game-logic/lib/modules/board/entities/board-field/board-field.interface';
import { IActor } from '@game-logic/lib/modules/actors/entities/actor/actor.interface';


@Injectable()
export class ComputerTurnService implements IProcedureController, IGatheringController {

  constructor( 
    private readonly _dungeonAiService: DungeonArtificialIntelligenceService,
    private readonly _commandsService: CommandsService,
    private readonly _uiService: UiService,
  ) { }

  public isComputerTurn(s: DungeonStateStore): boolean {
    return s.currentState.currentPlayer.playerType === PlayerType.Computer
  }

  public async handleTurn(s: DungeonStateStore): Promise<void> {
    if (!this.isComputerTurn(s)) {
      throw new Error("Cannot handle non computer turn");
    }

    const pawn = s.currentState.getCurrentPlayerSelectedPawn<IPawn & IDeckBearer>();
    const cardsToUtilize = this._dungeonAiService.determineCardsOrder(pawn.deck.hand.getCards());
    while (cardsToUtilize.length !== 0) {
      const card = cardsToUtilize.shift();
      const playCardActivity = card.activities.find(a => a.id === PLAY_CARD_ACTIVITY) as ICommand;
      if (!playCardActivity) {
        throw new Error("Given card has not playcard activity");
      }

      await this._uiService.requestAcknowledgement(this._createAcknowledgementContent(card));
      await this._commandsService.executeCommand(s, playCardActivity, { controller: this })
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  public async listenForEarlyResolve(s: boolean): Promise<boolean> {
    return false;
  }

  public gather(context: IGatheringContext): Promise<IGatheredData<IDistinguishableData>> {
    if (context.allowedData.length <= 0) {
      throw new Error("There is not allowed data to gather")
    }
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
  }  


  private _createAcknowledgementContent(card: ICard): any {

  }

} 