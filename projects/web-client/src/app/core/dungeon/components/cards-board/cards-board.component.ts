import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { IDraggableCard } from '../../mixins/draggable-card/draggable-card.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { CardContainerComponent } from '../card-container/card-container.component';

@Component({
  selector: 'cards-board',
  templateUrl: './cards-board.component.html',
  styleUrls: ['./cards-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('cardEnter', [
      transition(':enter', [
        style({ transform: "translateX({{initialX}}px) translateY({{initialY}}px) rotate(0) scale(1)" }),
        animate('{{duration}}ms {{delay}}ms ease-in-out', style({ transform: "translateX({{targetX}}px) translateY({{targetY}}px) rotate(0) scale(1)" }))
      ], { params: { initialX: 0, initialY: 0, targetX: 0, targetY: 0, delay: 0, duration: 0 } }),
    ]),
  ]
})
export class CardsBoardComponent implements OnInit {

  @ViewChild(CardContainerComponent) cardContainer: ComponentRef<CardContainerComponent>

  @Input() deck: IDeck;
  public dropListId = CARDS_BOARD_DROP_LIST;
  public isHovered: boolean = false;

  public cards: Array<ICardOnPile>
  allowPointer: boolean = false;

  constructor(
    private readonly _stateStore: DungeonStateStore,
    private readonly _commandsService: CommandService,
    private readonly _humanPlayerService: HumanPlayerService,
    private readonly _dragService: DragService,
    private readonly _changeDetector: ChangeDetectorRef
  ) { 
    this._changeDetector.detach();
  }

  ngOnInit(): void {
    this._commandsService.process$.subscribe(async p => {
      if (p === null) {
        this.cards = [];
      }

      for (let card of this.deck.hand.pile as Array<ICardOnPile & IDraggableCard>) {
        const playCardActivity = card.activities.find(a => a.id === PLAY_CARD_ACTIVITY);
        if (this._commandsService.currentProcess?.isProcessing(playCardActivity as ICommand)) {
          this.cards = [card];
          break;
        }
      }
      const x = this.cards.some(c => c.activities.some(a => a === this._commandsService.currentProcess.selectedCommand));
      this._changeDetector.detectChanges();

      if (this.cards.length > 0 &&
        this._commandsService.currentProcess &&
        !this._commandsService.currentProcess.isExecuted &&
        !this._commandsService.currentProcess.isExecuting &&
        this.cards.some(c => c.activities.some(a => a === this._commandsService.currentProcess.selectedCommand))) {
        await new Promise(r => setTimeout(r, 500))
        //await this.cardContainer.instance.playCardAnimation();
        this._commandsService.currentProcess.executeCommand();
      }
    });

    this._dragService.listenForDraggingProcess().subscribe(() => {
      this.allowPointer = true;
      this._changeDetector.detectChanges();
    })
    this._dragService.listenForDraggingProcessFinished().subscribe(() => {
      this.allowPointer = false
      this._changeDetector.detectChanges();
    })
  }

  public isCardAnimationBlocked(card: ICardOnPile & IDraggableCard) {
    return !!card.isDropped
  }

  public validateItemEnter(): Function {
    return (drag: CdkDrag<ICardOnPile>, drop: CdkDropList): boolean => {
      const pawn = this._stateStore.currentState.getCurrentPlayerSelectedPawn<IDeckBearer>();
      return drag.data.activities.some(a => a.canBeDone(pawn) && (a.id === PLAY_CARD_ACTIVITY));
    }
  }

  public async onDrop(e: CdkDragDrop<unknown, unknown, ICardOnPile & IDraggableCard>) {
    e.item.data.isDropped = true;
    e.item.data.isPlaying = true;
    const playCardActivity = e.item.data.activities.find(a => a.id === PLAY_CARD_ACTIVITY);
    this._dragService.finishDraggingProcess(e);
    this.isHovered = false;
    this._commandsService.executeCommand(playCardActivity, this._stateStore, this._humanPlayerService);
    this._changeDetector.detectChanges();
  }

  public onDropListEntered(e: CdkDragEnter<ICardOnPile>) {
    this.isHovered = true;
    this._changeDetector.detectChanges();

  }

  public onDropListExited(e: CdkDragEnter<ICardOnPile>) {
    this.isHovered = false;
    this._changeDetector.detectChanges();
  }

  public getCardEnterAnimation(card: ICardOnPile & IDraggableCard, elementRef: HTMLElement) {
    const cbb = card.getContainerBoundingBox()
    const ebb = elementRef.getBoundingClientRect();
    return {
      value: this.cards.length,
      params: {
        initialX: cbb.x - ebb.x,
        initialY: cbb.y - ebb.y,
        duration: 300
      }
    }
  }

  public enterAnimationEnd(c: ICardOnPile & IDraggableCard) {
    delete c.isDropped;
  }

}
