import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { CARDS_BOARD_DROP_LIST, CARDS_OUTLET_DROP_LIST, DECK_DROP_LIST } from '../../constants/card-drop-list.constants';
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragRelease, CdkDropList } from '@angular/cdk/drag-drop';
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
        style({ transform: "translateX({{initialX}}px) translateY({{initialY}}px) rotate(0) scale(1)" }),
        animate('{{duration}}ms {{delay}}ms ease-in-out', style({ transform: "translateX({{targetX}}px) translateY({{targetY}}px) rotate(0) scale(1)" }))
      ], { params: { initialX: 0, initialY: 0, targetX: 0, targetY: 0, delay: 0, duration: 0 } }),
    ]),
    trigger('cardLeave', [
      transition(':leave', [
        style({ transform: "translateX({{initialX}}px) translateY({{initialY}}px) rotate(0) scale(1)" }),
        animate('{{duration}}ms {{delay}}ms ease-in-out', style({ transform: "translateX({{targetX}}px) translateY({{targetY}}px) rotate(0) scale(1)" }))
      ], { params: { initialX: 0, initialY: 0, targetX: 0, targetY: 0, delay: 0, duration: 0 } }),
    ]),
  ]
})
export class CardsDeckComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkDropList) _deckDropList: CdkDropList
  @Input() deck: IDeck;

  public cards: Array<ICardOnPile & IDraggableCard>
  public dropListId = DECK_DROP_LIST;
  public isHovered = false;

  public trashedCards: Map<ICardOnPile, ICardOnPile> = new Map();
  public discardedCards: Map<ICardOnPile, ICardOnPile> = new Map();
  private _enteringCardAnimations: Map<ICardOnPile, any> = new Map();
  private _leavingCardAnimations: Map<ICardOnPile, any> = new Map();
  private _defaultAnimation = { value: 0 }

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
    this._stateStore.state$.subscribe(s => {

      const trashedCards = this.deck.trashPile.pile.filter(p => !this.trashedCards.has(p)) as Array<ICardOnPile & IDraggableCard>;
      for (let c of trashedCards) {
        c.isTrashed = true;
        c.registerDropListChange(this.dropListId);
        this.trashedCards.set(c, c);
      }

      const discardedCards = this.deck.discardPile.pile.filter(p => !this.discardedCards.has(p)) as Array<ICardOnPile & IDraggableCard>;
      for (let c of discardedCards) {
        c.isDiscarded = true;
        c.registerDropListChange(this.dropListId);
        this.discardedCards.set(c, c);
      }

      this.cards = trashedCards.concat(discardedCards).filter(d => d.isDropped || d.previousDropList === CARDS_BOARD_DROP_LIST);
      this._updateEnteringCardsAnimations(this.cards);
      this._changeDetector.detectChanges();
      setTimeout(() => {
        this.cards = []
        this._changeDetector.detectChanges();
      }, 3000);
    })
  }

  ngAfterViewInit(): void {
    this._dragService.registerDropList(this._deckDropList);
  }

  private _updateEnteringCardsAnimations(
    enteringCards: Array<ICardOnPile & IDraggableCard>,
  ): void {
    for (let card of enteringCards) {
      let animation;
      if (card.currentDropList === this.dropListId && card.previousDropList == CARDS_BOARD_DROP_LIST) {
        animation = containerRef => {
          const p = card.getParameters(containerRef)
          return {
            value: this.cards.length,
            params: {
              initialX: p.targetX,
              initialY: p.targetY,
              duration: 3000
            }
          }
        }
      } 
      this._enteringCardAnimations.set(card, animation);
    }
  }

  public calculateCardLeaveAnimation(card: ICardOnPile & IDraggableCard, containerRef: HTMLElement) {
    const i = this.cards.indexOf(card);
    return {
      value: this.cards.length,
      params: {
        initialX: 0,
        initialY: 0,
        targetX: -500,
        targetY: 0,
        delay: i * 100,
        duration: 300
      }
    }
  }

  public getCardEnterAnimation(card: ICardOnPile & IDraggableCard, elementRef: HTMLElement) {
    const provider = this._enteringCardAnimations.get(card)
    if (provider) {
      return provider(elementRef)
    } else {
      this._defaultAnimation.value = this.cards.length;
      return this._defaultAnimation
    }
  }

  public getCardLeaveAnimation(card: ICardOnPile & IDraggableCard, elementRef: HTMLElement) {
    const provider = this._leavingCardAnimations.get(card)
    if (provider) {
      return provider(elementRef)
    } else {
      this._defaultAnimation.value = this.cards.length;
      return this._defaultAnimation
    }
  }


  public enterAnimationEnd(card: ICardOnPile & IDraggableCard) {
    delete card.isDiscarded;
    delete card.isTrashed;
    delete card.isDropped
  }

  public validateItemEnter(): Function {
    return (drag: CdkDrag<ICardOnPile>, drop: CdkDropList): boolean => {
      const pawn = this._stateStore.currentState.getCurrentPlayerSelectedPawn<IDeckBearer>();
      return drag.data.activities.some(a => a.canBeDone(pawn) && (a.id === TRASH_CARD_ACTIVITY || a.id === DISCARD_CARD_ACTIVITY));
    }
  }

  public onDragReleased(e: CdkDragRelease<ICardOnPile & { ref: ICard }>) {
 
  }

  public onDrop(e: CdkDragDrop<unknown, unknown, ICardOnPile & IDraggableCard>) {
    const activities = e.item.data.activities.filter(a => a.id === TRASH_CARD_ACTIVITY || a.id === DISCARD_CARD_ACTIVITY)
    this._commandsService.executeCommand(activities, this._stateStore, this._humanPlayerService);
    this._dragService.finishDraggingProcess(e);
    e.item.data.isDropped = true;
    this.isHovered = false;
  }


  public onDropListEntered(e: CdkDragEnter<ICardOnPile & { ref: ICard }>) {
    this.isHovered = true;

  }

  public onDropListExited(e: CdkDragEnter<ICardOnPile & { ref: ICard }>) {
    this.isHovered = false;
  }

}
