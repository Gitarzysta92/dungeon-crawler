import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CommandService } from 'src/app/core/game/services/command.service';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { CARDS_BOARD_DROP_LIST, CARDS_OUTLET_DROP_LIST, DECK_DROP_LIST } from '../../constants/card-drop-list.constants';
import { Observable, merge } from 'rxjs';
import { ICardOnPile } from '@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface';
import { SceneMediumFactory } from 'src/app/core/scene/mixins/scene-medium/scene-medium.factory';
import { trigger, transition, style, animate  } from '@angular/animations';
import { PLAY_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { IDraggableCard } from '../../mixins/draggable-card/draggable-card.interface';


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

  public cardsMargin: number = 0;
  private _tiltNumbers: number[] = [];
  private _tiltFactor: number = 2;

  private _enteredCards: Map<ICardOnPile & IDraggableCard, ICardOnPile & IDraggableCard> = new Map();

  constructor(
    private readonly _commandsService: CommandService,
    private readonly _stateStore: DungeonStateStore,
    private readonly _renderer2: Renderer2,
    private readonly _dragService: DragService,
    private readonly _changeDetector: ChangeDetectorRef
  ) { }
  
  ngOnInit(): void {
    this.calculateCardsMargin();
    merge(this._stateStore.state$, this._commandsService.process$)
      .subscribe(() => {
        const cards = [];
        for (let c of this.deck.hand.pile as Array<ICardOnPile & IDraggableCard>) {
          const playCardActivity = c.activities.find(a => a.id === PLAY_CARD_ACTIVITY);
          if (!playCardActivity || this._commandsService.currentProcess?.isProcessing(playCardActivity as ICommand)) {
            continue;
          }
          cards.push(c);
          if (!this.cards.includes(c)) {
            this._enteredCards.set(c, c);
          }
          c.registerDropListChange(this.dropListId);
        }
        this.cards = cards;
      
        this._updateCardsTilt();
        this.calculateCardsMargin();
        this._changeDetector.markForCheck();
      })
  }

  ngAfterViewInit(): void {
    this._updateCardsTilt();
  }

  public calculateCardEnterAnimation(card: ICardOnPile & IDraggableCard, containerRef: HTMLElement) {
    const i = this.cards.indexOf(card);
    if (card.currentDropList === this.dropListId && (!card.previousDropList || card.previousDropList === DECK_DROP_LIST)) { 
      return {
        value: this.cards.length,
        params: {
          initialX: -500,
          initialY: 0,
          targetX: 0,
          targetY: 0,
          delay: this._enteredCards.has(card) ? (this._enteredCards.size - i) * 100 : 0,
          duration: 200
        }
      };
    }
    if (card.currentDropList === this.dropListId && card.previousDropList === CARDS_BOARD_DROP_LIST) {
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
    return {
      value: this.cards.length,
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


  public animationEnd(c: ICardOnPile & IDraggableCard) {
    this._enteredCards.delete(c);
    this._updateCardsTilt();
    this.calculateCardsMargin();
    this._changeDetector.markForCheck();
  }

  public calculateCardsMargin() {
    this.cardsMargin = (this.cards.length * this.cards.length * 2) - 10;
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
  }


  public onDragStarted(e: CdkDragStart<ICardOnPile & IDraggableCard>) {
    e.source.data.isDragging = true;
    this._dragService.startDraggingProcess(e as any)
  }

  public onDragEnded(e: CdkDragEnd<ICardOnPile & IDraggableCard>) {
    e.source.data.isDragging = false;
    this._dragService.interruptDraggingProcess(e)
  }

  public onDropListEntered(e: CdkDragEnter<ICardOnPile>) {
    this._renderer2.addClass(e.item.element.nativeElement, "inside-origin-list")
  }

  public onDropListExited(e: CdkDragEnter<ICardOnPile>) {
    this._renderer2.addClass(e.item.element.nativeElement, "outside-origin-list")
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
}


   // this.cardWrappers.changes.subscribe(c => {
    //   const tilts = this._calculateTilts(this.cards.length)
    //   c.forEach((item, i) => this._applyTilt(item, tilts[i]))
    // })