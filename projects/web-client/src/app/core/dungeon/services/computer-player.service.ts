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


@Injectable()
export class ComputerTurnService {

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
      await this._commandsService.executeCommand(s, playCardActivity, { controller: this._dungeonAiService })
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  private _createAcknowledgementContent(card: ICard): any {

  }

} 