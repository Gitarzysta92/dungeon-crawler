import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CommandService } from 'src/app/core/game/services/command.service';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragRelease, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { CARDS_BOARD_DROP_LIST, CARDS_OUTLET_DROP_LIST, DECK_DROP_LIST } from '../../constants/card-drop-list.constants';
import { Observable, distinctUntilChanged, map, merge } from 'rxjs';
import { ICardOnPile } from '@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface';
import { SceneMediumFactory } from 'src/app/core/scene/mixins/scene-medium/scene-medium.factory';
import { trigger, transition, style, animate  } from '@angular/animations';
import { PLAY_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { IDraggableCard } from '../../mixins/draggable-card/draggable-card.interface';
import { HumanPlayerService } from '../../services/human-player.service';


@Component({
  selector: 'cards-outlet',
  templateUrl: './cards-outlet.component.html',
  styleUrls: ['./cards-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class CardsOutletComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkDropList) _deckDropList: CdkDropList
  @ViewChildren("wrapper", {read: ElementRef}) cardWrappers: QueryList<ElementRef>
  @Input() deck: IDeck;

  public cards: Array<ICardOnPile & IDraggableCard> = [];
  public dropListId = CARDS_OUTLET_DROP_LIST;
  public connectedTo: Observable<CdkDropList[]>; 
  public dragging: boolean;
  public isProcessing: boolean;
  public cardsMargin: number = 0;
  private _tiltNumbers: number[] = [];
  private _tiltFactor: number = 2;
  private _enteringCardAnimations: Map<ICardOnPile, any> = new Map();
  private _leavingCardAnimations: Map<ICardOnPile, any> = new Map();
  private _defaultAnimation = { value: 0 }


  constructor(
    private readonly _commandsService: CommandService,
    private readonly _stateStore: DungeonStateStore,
    private readonly _renderer2: Renderer2,
    private readonly _dragService: DragService,
    private readonly _changeDetector: ChangeDetectorRef,
    private readonly _humanPlayerService: HumanPlayerService,
  ) { 
    this._changeDetector.detach()
  }
  
  ngOnInit(): void {
    this._calculateCardsMargin();

    this._commandsService.process$.subscribe(p => {
      this.isProcessing = !!p;
      this._changeDetector.detectChanges()
    })

    merge(this._stateStore.state$, this._commandsService.process$)
      .pipe(
        map(() => {
        const incomingCards = (this.deck.hand.pile as Array<ICardOnPile & IDraggableCard>).filter(c => {
          const playCardActivity = c.activities.find(a => a.id === PLAY_CARD_ACTIVITY);
          return playCardActivity && !this._commandsService.currentProcess?.isProcessing(playCardActivity as ICommand)
        });
        return this._esatblishCardsChange(incomingCards, this.cards)
        }),
        distinctUntilChanged((p, c) => p.cards.length === c.cards.length && c.cards.every(c => p.cards.includes(c)))
      )
      .subscribe(({ entering, leaving, cards }) => {
        this._updateLeavingCardsAnimations(leaving);
        this._changeDetector.detectChanges();
        this.cards = cards;
        for (let c of this.cards) {
          c.registerDropListChange(this.dropListId);
        }
        this._updateEnteringCardsAnimations(entering, this.cards);
        this._updateCardsTilt();
        this._calculateCardsMargin();
        this._changeDetector.detectChanges();
      })
  }

  ngAfterViewInit(): void {
    this._updateCardsTilt();
  }

  public playCard(card: ICardOnPile & IDraggableCard): void {
    const playCardActivity = card.activities.find(a => a.id === PLAY_CARD_ACTIVITY);
    this._commandsService.executeCommand(playCardActivity, this._stateStore, this._humanPlayerService)
  }

  private _updateEnteringCardsAnimations(
    enteringCards: Array<ICardOnPile & IDraggableCard>,
    allCards: Array<ICardOnPile & IDraggableCard>
  ): void {
    for (let card of enteringCards) {
      let animation;
      if (card.currentDropList === this.dropListId && (!card.previousDropList || card.previousDropList === DECK_DROP_LIST)) {
        const i = allCards.indexOf(card);
        animation = () => ({
          value: allCards.length,
          params: {
            initialX: -1000,
            initialY: 0,
            targetX: 0,
            targetY: 0,
            delay: (enteringCards.length - i) * 100,
            duration: 200
          }
        });
      } else if (card.currentDropList === this.dropListId && card.previousDropList === CARDS_BOARD_DROP_LIST) {
        animation = containerRef => {
          const p = card.getParameters(containerRef)
          return {
            value: this.cards.length,
            params: {
              initialX: p.targetX,
              initialY: p.targetY,
              duration: 300
            }
          }
        }
      }
      this._enteringCardAnimations.set(card, animation);
    }
  }

  private _updateLeavingCardsAnimations(leavingCards: Array<ICardOnPile & IDraggableCard>) {
    for (let card of leavingCards) {
      const i = this.cards.indexOf(card);
      let animation;
      if (card.currentDropList === DECK_DROP_LIST && card.previousDropList === this.dropListId) {
        animation = () => ({
          value: this.cards.length,
          params: {
            initialX: 0,
            initialY: 0,
            targetX: -1000,
            targetY: 0,
            delay: i * 100,
            duration: 300
          }
        })
      }
      this._leavingCardAnimations.set(card, animation);
    }
  }

  public isCardAnimationBlocked(card: ICardOnPile & IDraggableCard) {
    return card.currentDropList === CARDS_BOARD_DROP_LIST && card.previousDropList === this.dropListId
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

  public enterAnimationEnd(c: ICardOnPile & IDraggableCard) {
    this._enteringCardAnimations.delete(c);
    this._updateCardsTilt();
    this._calculateCardsMargin();
    //this._changeDetector.detectChanges();
  }

  public leaveAnimationEnd(c: ICardOnPile & IDraggableCard) {
    this._leavingCardAnimations.delete(c);
    this._updateCardsTilt();
    this._calculateCardsMargin();
    //this._changeDetector.detectChanges();
  }

  public hover(e: MouseEvent, card: ICardOnPile): void {
    if (e.type === 'mouseenter') {
      SceneMediumFactory.asSceneMedium(card.ref.deck.bearer.deref()).isHovered = true;
    } else {
      SceneMediumFactory.asSceneMedium(card.ref.deck.bearer.deref()).isHovered = false
    }
  }

  public validateItemEnter(drag: CdkDrag, drop: CdkDropList): boolean {
    return true;
  }

  public onDrop(e: CdkDragDrop<ICardOnPile>) {
    moveItemInArray(this.cards, e.previousIndex, e.currentIndex);
    moveItemInArray(this.deck.hand.pile, e.previousIndex, e.currentIndex);

    setTimeout(() => this._updateCardsTilt(), 0);
    this._dragService.finishDraggingProcess(e);
    this._changeDetector.detectChanges();
  }


  public onDragStarted(e: CdkDragStart<ICardOnPile & IDraggableCard>) {
    this.dragging = true
    this._dragService.startDraggingProcess(e as any);
    this._changeDetector.detectChanges()
  }

  public onDragEnded(e: CdkDragEnd<ICardOnPile & IDraggableCard>) {
    this._dragService.interruptDraggingProcess(e);

  }

  public onDragReleased(e: CdkDragRelease<ICardOnPile & IDraggableCard>) {
    this.dragging = false;
    this._changeDetector.detectChanges();
  }


  public onDropListEntered(e: CdkDragEnter<ICardOnPile>) {
  }

  public onDropListExited(e: CdkDragEnter<ICardOnPile>) {

  }

  public _calculateCardsMargin() {
    this.cardsMargin = (this.cards.length * this.cards.length * 2) - 10;
  }

  private _updateCardsTilt(): void {
    if (!this.cardWrappers) {
      return;
    }
    const tilts = this._calculateTilts(this.cards.length);
    this.cardWrappers.forEach((item, i) => this._applyTilt(item, tilts[i]));
  }

  private _applyTilt(i: ElementRef, tilt: number): void {
    const translate = ((Math.abs(tilt) * Math.abs(tilt)) - 2) * 0.3
    this._renderer2.setStyle(i.nativeElement, "transform", `rotate(${tilt}deg) translateY(${translate}%)`)
  }

  private _calculateTilts(length: number): number[] {
    this._tiltNumbers.length = 0;
    const isEven = !(length % 2);
    const l = (isEven ? length : length - 1)
    const s = - l / 2
    const e = (l / 2) + 1;

    for (let i = s; i < e; i++) {
      if (isEven && i === 0) {
        continue
      } else {
        this._tiltNumbers.push(i * this._tiltFactor)
      }  
    }
    return this._tiltNumbers;
  }

  private _esatblishCardsChange(
    incomingCards: Array<ICardOnPile & IDraggableCard>,
    currentCards: Array<ICardOnPile & IDraggableCard>,
  ): {
      entering: Array<ICardOnPile & IDraggableCard>,
      leaving: Array<ICardOnPile & IDraggableCard>,
      cards: Array<ICardOnPile & IDraggableCard>
  } {
    const change = { entering: [], leaving: [], cards: [] }
    const cards = [];
    for (let c of incomingCards) {
      cards.push(c);
      if (!currentCards.some(cc => cc === c)) {
        change.entering.push(c);
      }
      change.cards.push(c);
    }
    for (let c of currentCards) {
      if (!incomingCards.some(ic => ic === c)) {
        change.leaving.push(c);
      }
    }
    return change;
  }
}


   // this.cardWrappers.changes.subscribe(c => {
    //   const tilts = this._calculateTilts(this.cards.length)
    //   c.forEach((item, i) => this._applyTilt(item, tilts[i]))
    // })