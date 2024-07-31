import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CommandService } from 'src/app/core/game/services/command.service';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragRelease, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { CARDS_OUTLET_DROP_LIST } from '../../constants/card-drop-list.constants';
import { Observable, merge } from 'rxjs';
import { ICardOnPile } from '@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface';
import { SceneMediumFactory } from 'src/app/core/scene/mixins/scene-medium/scene-medium.factory';
import { trigger, transition, style, animate, query, stagger, state, animateChild } from '@angular/animations';
import { PLAY_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { IDraggableCard } from '../../mixins/draggable-card/draggable-card.interface';


@Component({
  selector: 'cards-outlet',
  templateUrl: './cards-outlet.component.html',
  styleUrls: ['./cards-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('drawCards', [
      transition('* => play', [
        query('div:not(.custom-animatiom):enter', [
          style({ transform: "translateX(-500px) translateY(-50px) rotate(-180deg) scale(0.1)" }),
          stagger(50, animate('0.3s ease-in-out', style({ transform: "translateX(0) translateY(0) rotate(0) scale(1)" })))
        ], { optional: true }),
        query('div.custom-animatiom:enter card-wrapper-outer', animateChild(), { optional: true })
      ])
    ]),
    trigger('discardCards', [
      // transition('* => play', [
      //   query('div:not(.custom-animatiom):leave', [
      //     style({ transform: "translateX(0) translateY(0) rotate(0) scale(1)" }),
      //     stagger(50, animate('0.3s ease-in-out', style({ transform: "translateX(-500px) translateY(-50px) rotate(-180deg) scale(0.1)" })))
      //   ], { optional: true })
      // ])
    ]),


    trigger('cardRestored', [
      state(CARDS_OUTLET_DROP_LIST,
        style({
          transform: "translateX(0) translateY(0) rotate(0) scale(1)",
        }), {params: {targetX: 0, targetY: 0 }}
      ),
      transition(`void => ${CARDS_OUTLET_DROP_LIST}`, [
        style({
          transform: "translateX({{targetX}}px) translateY({{targetY}}px) rotate(0) scale(1)",
        }),
        animate('0.2s ease-out')
      ], { params: { targetX: 0, targetY: 0 } }),
    ]),
    // trigger('rollIn', [
    //   transition(':enter', [
    //     style({ transform: "translateX(-500px) rotate(-180deg) scale(0.5)" }),
    //     animate('0.3s ease-in', style({ transform: "translateX(0) rotate(0) scale(1)" }))
    //   ])
    // ])
  ]
})
export class CardsOutletComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkDropList) _deckDropList: CdkDropList
  @ViewChildren("wrapper", {read: ElementRef}) cardWrappers: QueryList<ElementRef>
  @Input() deck: IDeck;

  public cards: Array<ICardOnPile & IDraggableCard> = [];
  public dropListId = CARDS_OUTLET_DROP_LIST;
  public connectedTo: Observable<CdkDropList[]>; 

  public drawAnimationState: 'play' | 'idle' = 'idle';
  public discardAnimationState: 'play' | 'idle' = 'idle';
  //public restoreCardAnimationState: 'play' | 'idle' = 'idle';
  public cardsMargin: number = 0;

  private _tiltNumbers: number[] = [];
  private _tiltFactor: number = 2;

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
        const prevCardsLength = this.cards.length;
        this.cards = this.deck.hand.pile.filter(c => {
          const playCardActivity = c.activities.find(a => a.id === PLAY_CARD_ACTIVITY);
          if (!playCardActivity) {
            return true
          }
          return !this._commandsService.currentProcess?.isProcessing(playCardActivity as ICommand)
        }) as Array<ICardOnPile & IDraggableCard>;

        for (let card of this.cards) {
          card.registerDropListChange(this.dropListId);
        }
        this._tryPlayDiscardAnimation(this.cards.length, prevCardsLength);
        this._tryPlayDrawAnimation(prevCardsLength);  
        this._updateCardsTilt();
        this.calculateCardsMargin();
        this._changeDetector.markForCheck();
      })
  }

  ngAfterViewInit(): void {
    this._updateCardsTilt();
    this._dragService.registerDropList(this._deckDropList);
  }


  
  private _tryPlayDrawAnimation(cardsLength: number) {
    if (cardsLength < this.cards.length && this.cards.some(c => c.currentDropList === this.dropListId && !c.previousDropList)) {
      this.drawAnimationState = "play"
    }
  }

  public drawAnimationEnd(e) {
    this.drawAnimationState = "idle";
    this._updateCardsTilt()
  }

  private _tryPlayDiscardAnimation(currLength: number, prevLength: number) {
    if (currLength < prevLength) {
      this.discardAnimationState = "play"
    }
  }

  public discardAnimationEnd(e) {
    this.discardAnimationState = "idle";
    this._updateCardsTilt()
  }


  public cardRestoreEnd(e) {
    console.log(e);
  }


  public calculateCardsMargin() {
    this.cardsMargin = (this.cards.length * this.cards.length * 2) - 10;
  }

  public validate() {
    return this.cards.length
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
    setTimeout(() => this._updateCardsTilt(), 0);
    this._dragService.finishDraggingProcess(e);
  }

  public onDragReleased(e: CdkDragRelease<ICardOnPile>) {
   // console.log(e);
  }

  public onDragStarted(e) {
    this._dragService.startDraggingProcess(e)
  }

  public onDragEnded(e: CdkDragEnd<ICardOnPile>) {
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