import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CARDS_BOARD_DROP_LIST } from '../../constants/card-drop-list.constants';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDropList } from '@angular/cdk/drag-drop';
import { ICardOnPile } from '@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { PLAY_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { CommandService } from 'src/app/core/game/services/command.service';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { HumanPlayerService } from '../../services/human-player.service';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IDeckBearer } from '@game-logic/lib/modules/cards/entities/deck-bearer/deck-bearer.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { IDraggableCard } from '../../mixins/draggable-card/draggable-card.interface';

@Component({
  selector: 'cards-board',
  templateUrl: './cards-board.component.html',
  styleUrls: ['./cards-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('rollOut', [
      transition(':leave', [
        style({ transform: "translateX(0px) rotate(0deg) scale(1)" }),
        animate('0.3s ease-in', style({ transform: "translateX(-500) rotate(0) scale(1)" }))
      ])
    ])
  ]
})
export class CardsBoardComponent implements OnInit {

  @Input() deck: IDeck;
  public dropListId = CARDS_BOARD_DROP_LIST;
  public isHovered: boolean;

  public cards: Array<ICardOnPile>
  allowPointer: boolean = true;

  constructor(
    private readonly _stateStore: DungeonStateStore,
    private readonly _commandsService: CommandService,
    private readonly _humanPlayerService: HumanPlayerService,
    private readonly _dragService: DragService,
    private readonly _changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._commandsService.process$.subscribe(p => {
      if (p === null) {
        this.cards = [];
      }

      for (let card of this.deck.hand.pile) {
        const playCardActivity = card.activities.find(a => a.id === PLAY_CARD_ACTIVITY);
        if (this._commandsService.currentProcess?.isProcessing(playCardActivity as ICommand)) {
          this.cards = [card];
          break;
        }
      }
      this._changeDetector.markForCheck();
    });

    this._dragService.listenForDraggingProcess().subscribe(() => {
      this.allowPointer = true;
      this._changeDetector.markForCheck();
    })
    this._dragService.listenForDraggingProcessFinished().subscribe(() => {
      this.allowPointer = false
      this._changeDetector.markForCheck();
    })

  }

  public validateItemEnter(): Function {
    return (drag: CdkDrag<ICardOnPile>, drop: CdkDropList): boolean => {
      const pawn = this._stateStore.currentState.getCurrentPlayerSelectedPawn<IDeckBearer>();
      return drag.data.activities.some(a => a.canBeDone(pawn) && (a.id === PLAY_CARD_ACTIVITY));
    }
  }

  public onDrop(e: CdkDragDrop<unknown, unknown, ICardOnPile & IDraggableCard>) {
    e.item.data.registerDropListChange(this.dropListId);
    const playCardActivity = e.item.data.activities.find(a => a.id === PLAY_CARD_ACTIVITY);
    this._commandsService.executeCommand(playCardActivity, this._stateStore, this._humanPlayerService);
    this._dragService.finishDraggingProcess(e);
    this.isHovered = false;
  }

  public onDropListEntered(e: CdkDragEnter<ICardOnPile>) {
    this.isHovered = true;

  }

  public onDropListExited(e: CdkDragEnter<ICardOnPile>) {
    this.isHovered = false;
  }

}
