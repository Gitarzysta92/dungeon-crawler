import { Component, Input, OnInit } from '@angular/core';
import { CARDS_BOARD_DROP_LIST } from '../../constants/card-drop-list.constants';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDropList } from '@angular/cdk/drag-drop';
import { ICardOnPile } from '@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface';
import { ICard } from '@game-logic/lib/modules/cards/entities/card/card.interface';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { PLAY_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { CommandService } from 'src/app/core/game/services/command.service';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { HumanPlayerService } from '../../services/human-player.service';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IDeckBearer } from '@game-logic/lib/modules/cards/entities/deck-bearer/deck-bearer.interface';

@Component({
  selector: 'cards-board',
  templateUrl: './cards-board.component.html',
  styleUrls: ['./cards-board.component.scss']
})
export class CardsBoardComponent implements OnInit {

  @Input() deck: IDeck;
  public dropListId = CARDS_BOARD_DROP_LIST;
  public isHovered: boolean;

  public cards: Array<ICardOnPile & { ref: ICard }>

  constructor(
    private readonly _stateStore: DungeonStateStore,
    private readonly _commandsService: CommandService,
    private readonly _humanPlayerService: HumanPlayerService,
    private readonly _dragService: DragService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.cards = this.deck.hand.pile.filter(c => {
      const playCardActivity = c.activities.find(a => a.id === PLAY_CARD_ACTIVITY);
      if (!playCardActivity) {
        return false
      }
      return this._commandsService.currentProcess?.isProcessing(playCardActivity as ICommand)
    });
  }


  public validateItemEnter(): Function {
    return (drag: CdkDrag<ICardOnPile>, drop: CdkDropList): boolean => {
      const pawn = this._stateStore.currentState.getCurrentPlayerSelectedPawn<IDeckBearer>();
      return drag.data.activities.some(a => a.canBeDone(pawn) && (a.id === PLAY_CARD_ACTIVITY));
    }
  }

  public onDrop(e: CdkDragDrop<ICardOnPile & { ref: ICard }>) {
    const playCardActivity = e.item.data.activities.find(a => a.id === PLAY_CARD_ACTIVITY);
    this._commandsService.executeCommand(playCardActivity, this._stateStore, this._humanPlayerService);
    this._dragService.finishDraggingProcess(e);
    this.isHovered = false;
  }

  public onDropListEntered(e: CdkDragEnter<ICardOnPile & { ref: ICard }>) {
    this.isHovered = true;

  }

  public onDropListExited(e: CdkDragEnter<ICardOnPile & { ref: ICard }>) {
    this.isHovered = false;
  }

}
