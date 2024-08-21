import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { DECK_DROP_LIST } from '../../constants/card-drop-list.constants';
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDropList } from '@angular/cdk/drag-drop';
import { ICard } from '@game-logic/lib/modules/cards/entities/card/card.interface';
import { DISCARD_CARD_ACTIVITY, TRASH_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { CommandService } from 'src/app/core/game/services/command.service';
import { IDeckBearer } from '@game-logic/lib/modules/cards/entities/deck-bearer/deck-bearer.interface';
import { HumanPlayerService } from '../../services/human-player.service';
import { ICardOnPile } from '@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { IDraggableCard } from '../../mixins/draggable-card/draggable-card.interface';

@Component({
  selector: 'cards-deck',
  templateUrl: './cards-deck.component.html',
  styleUrls: ['./cards-deck.component.scss'],
  animations: [
    trigger('cardEnter', [
      transition(':enter', [
        style({ transform: "translateX({{initialX}}px) translateY({{initialY}}px) rotate({{initialRotation}}deg) scale({{initialScale}})" }),
        animate('{{duration}}ms {{delay}}ms ease-in-out', style({ transform: "translateX({{targetX}}px) translateY({{targetY}}px) rotate({{targetRotation}}deg) scale({{targetScale}})" }))
      ], { params: { initialX: 0, initialY: 0, targetX: 0, targetY: 0, delay: 0, duration: 0, initialScale: 1, targetScale: 1, initialRotation: 0, targetRotation: 0 } }),
    ]),
    trigger('cardLeave', [
      transition(':leave', [
        style({ transform: "translateX({{initialX}}px) translateY({{initialY}}px) rotate({{initialRotation}}deg) scale({{initialScale}})" }),
        animate('{{duration}}ms {{delay}}ms ease-in-out', style({ transform: "translateX({{targetX}}px) translateY({{targetY}}px) rotate({{targetRotation}}deg) scale({{targetScale}})" }))
      ], { params: { initialX: 0, initialY: 0, targetX: 0, targetY: 0, delay: 0, duration: 0, initialScale: 1, targetScale: 1, initialRotation: 0, targetRotation: 0  } }),
    ]),
  ]
})
export class CardsDeckComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkDropList) _deckDropList: CdkDropList
  @Input() bearer: IDeckBearer;

  public discardedCards: Array<ICardOnPile & IDraggableCard> = [];
  public trashedCards: Array<ICardOnPile & IDraggableCard> = [];
  public dropListId = DECK_DROP_LIST;
  public isHovered = false;

  constructor(
    private readonly _dragService: DragService,
    private readonly _stateStore: DungeonStateStore,
    private readonly _commandsService: CommandService,
    private readonly _humanPlayerService: HumanPlayerService,
    private readonly _changeDetector: ChangeDetectorRef
  ) { 
    this._changeDetector.detach()
  }
 
  ngOnInit(): void {
    let timeout
    this._changeDetector.detectChanges();
    this.bearer.onDiscarded(e => {
      if (timeout) {
        clearTimeout(timeout)
      }
      this.discardedCards = e.cards as Array<ICardOnPile & IDraggableCard>;
      this._changeDetector.detectChanges();
      timeout = setTimeout(() => {
        this.discardedCards = [];
        this._changeDetector.detectChanges();
      }, 0);
    });
    
    this.bearer.onTrashed(e => {
      if (timeout) {
        clearTimeout(timeout);
      }
      this.trashedCards = e.cards as Array<ICardOnPile & IDraggableCard>;
      this._changeDetector.detectChanges();
      timeout = setTimeout(() => {
        this.trashedCards = [];
        this._changeDetector.detectChanges();
      }, 0);
    });

    this.bearer.onDraw(e => {
      for (let c of e.cards as Array<ICardOnPile & IDraggableCard>) {
        c.isPlaying = false;
        c.isDropped = false;
      }
    })
}

  ngAfterViewInit(): void {
    this._dragService.registerDropList(this._deckDropList);
  }

  public getCardLeaveAnimation(card: ICardOnPile & IDraggableCard, elementRef: HTMLElement) {
    const cbb = card.getContainerBoundingBox();
    const ebb = elementRef.getBoundingClientRect();
    if ((card.isDiscarded || card.isTrashed) && card.isDropped) {
      return {
        value: this.discardedCards.length,
        params: {
          targetScale: 0,
          targetRotation: 360,
          duration: 300
        }
      }
    } else if (card.isPlaying) {
      return {
        value: this.discardedCards.length,
        params: {
          initialX: cbb.x - ebb.x,
          initialY: cbb.y - ebb.y,
          targetScale: 0,
          duration: 300
        }
      }
    }
  }

  public validateItemEnter(): Function {
    return (drag: CdkDrag<ICardOnPile>, drop: CdkDropList): boolean => {
      const pawn = this._stateStore.currentState.getCurrentPlayerSelectedPawn<IDeckBearer>();
      return drag.data.activities.some(a => a.canBeDone(pawn) && (a.id === TRASH_CARD_ACTIVITY || a.id === DISCARD_CARD_ACTIVITY));
    }
  }

  public onDrop(c: CdkDragDrop<unknown, unknown, ICardOnPile & IDraggableCard>) {
    c.item.data.isDropped = true;
    const activities = c.item.data.activities.filter(a => a.id === TRASH_CARD_ACTIVITY || a.id === DISCARD_CARD_ACTIVITY)
    this._commandsService.executeCommand(activities, this._stateStore, this._humanPlayerService);
    this._dragService.finishDraggingProcess(c);
    this.isHovered = false;
  }


  public onDropListEntered(e: CdkDragEnter<ICardOnPile & { ref: ICard }>) {
    this.isHovered = true;
    this._changeDetector.detectChanges();

  }

  public onDropListExited(e: CdkDragEnter<ICardOnPile & { ref: ICard }>) {
    this.isHovered = false;
    this._changeDetector.detectChanges();
  }

}
