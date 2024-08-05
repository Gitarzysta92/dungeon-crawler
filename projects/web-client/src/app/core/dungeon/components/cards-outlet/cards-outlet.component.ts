import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CommandService } from 'src/app/core/game/services/command.service';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragRelease, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { CARDS_OUTLET_DROP_LIST } from '../../constants/card-drop-list.constants';
import { Observable, Subject, distinctUntilChanged, map, merge, takeUntil } from 'rxjs';
import { ICardOnPile } from '@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface';
import { SceneMediumFactory } from 'src/app/core/scene/mixins/scene-medium/scene-medium.factory';
import { trigger, transition, style, animate  } from '@angular/animations';
import { PLAY_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { IDraggableCard } from '../../mixins/draggable-card/draggable-card.interface';
import { HumanPlayerService } from '../../services/human-player.service';
import { MappingService } from 'src/app/core/game/services/mapping.service';
import { ProcedureFactory } from '@game-logic/lib/base/procedure/procedure.factory';
import { PlayCardCommand } from '../../commands/play-card.command';
import { InteractionService } from 'src/app/core/game/services/interaction.service';


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
export class CardsOutletComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(CdkDropList) _deckDropList: CdkDropList
  @ViewChildren("wrapper", {read: ElementRef}) cardWrappers: QueryList<ElementRef>
  @Input() deck: IDeck;

  public cards: Array<ICardOnPile & IDraggableCard> = [];
  public enteringCards: (ICardOnPile & IDraggableCard)[] = [];
  public dropListId = CARDS_OUTLET_DROP_LIST;
  public connectedTo: Observable<CdkDropList[]>; 
  public dragging: boolean;
  public isProcessing: boolean;
  public cardsMargin: number = 0;
  private _tiltNumbers: number[] = [];
  private _tiltFactor: number = 2;

  private _destroyed: Subject<void> = new Subject();

  constructor(
    private readonly _commandsService: CommandService,
    private readonly _stateStore: DungeonStateStore,
    private readonly _renderer2: Renderer2,
    private readonly _dragService: DragService,
    private readonly _changeDetector: ChangeDetectorRef,
    private readonly _humanPlayerService: HumanPlayerService,
    private readonly _mappingService: MappingService,
    private readonly _interactionService: InteractionService
  ) { 
    this._changeDetector.detach()
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
  
  ngOnInit(): void {
    this._calculateCardsMargin();

    this._commandsService.process$
      .pipe(takeUntil(this._destroyed))
      .subscribe(p => {
        this.isProcessing = !!p;
        this._changeDetector.detectChanges()
      })
    
    this._commandsService.process$.subscribe(s => {
      const incomingCards = (this.deck.hand.pile as Array<ICardOnPile & IDraggableCard>).filter(c => {
        const playCardActivity = c.activities.find(a => a.id === PLAY_CARD_ACTIVITY);
        return playCardActivity && !this._commandsService.currentProcess?.isProcessing(playCardActivity as ICommand)
      });
      this._updateProcedureCache(incomingCards);
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
        distinctUntilChanged((p, c) => p.cards.length === c.cards.length && c.cards.every(c => p.cards.includes(c))),
        takeUntil(this._destroyed)
      )
      .subscribe(({ entering, leaving, cards }) => {
        this._clearProcedureCache(leaving);
        this.enteringCards = entering;
        this._changeDetector.detectChanges();
        this.cards = cards;
        this._updateCardsTilt();
        this._calculateCardsMargin();
        this._changeDetector.detectChanges();
      })
  }

  ngAfterViewInit(): void {
    this._updateCardsTilt();
  }

  public playCard(card: ICardOnPile & IDraggableCard): void {
    card.isPlaying = true;
    const playCardActivity = card.activities.find(a => a.id === PLAY_CARD_ACTIVITY);
    this._commandsService.scheduleCommand(playCardActivity, this._stateStore, this._humanPlayerService);
  }



  public getEnteringCardAnimation(card: ICardOnPile & IDraggableCard, containerRef: HTMLElement) {
    if (card.wasDrawn() && !card.isPlaying) {
      const i = this.cards.indexOf(card);
      return {
        value: this.cards.length,
        params: {
          initialX: -1000,
          initialY: 0,
          targetX: 0,
          targetY: 0,
          delay: (this.enteringCards.length - i) * 100,
          duration: 200
        }
      };
    } else if (card.isPlaying) {
      const cbb = card.getContainerBoundingBox()
      const ebb = containerRef.getBoundingClientRect();
      return {
        value: this.cards.length,
        params: {
          initialX: cbb.x - ebb.x,
          initialY: cbb.y - ebb.y,
          duration: 300
        }
      }
    }
  }

  public getLeavingCardAnimation(card: ICardOnPile & IDraggableCard) {
    const i = this.cards.indexOf(card);
    if ((card.isDiscarded || card.isTrashed) && !card.isDropped) {
      return {
        value: this.cards.length,
        params: {
          initialX: 0,
          initialY: 0,
          targetX: -1000,
          targetY: 0,
          delay: i * 100,
          duration: 300
        }
      }
    }
  }

  public isCardAnimationBlocked(card: ICardOnPile & IDraggableCard) {
    return ((card.isTrashed || card.isDiscarded) && card.isDropped)
  }

  public enterAnimationEnd(c: ICardOnPile & IDraggableCard) {
    this._updateCardsTilt();
    this._calculateCardsMargin();
   // c.isPlaying = false;
    //this._changeDetector.detectChanges();
  }

  public leaveAnimationEnd(c: ICardOnPile & IDraggableCard) {
    this._updateCardsTilt();
    this._calculateCardsMargin();
    //this._changeDetector.detectChanges();
  }

  public hover(e: MouseEvent, card: ICardOnPile): void {
    if (e.type === 'mouseenter') {
      SceneMediumFactory.asSceneMedium(card.ref.deck.bearer.deref()).isHovered = true;
      const playCardActivity = card.activities.find(a => PlayCardCommand.isPlayCardCommand(a));
      this._interactionService.highlightElementsV2(PlayCardCommand.asPlayCardCommand(playCardActivity).playCardCommandProcedureCache.values())
    } else {
      SceneMediumFactory.asSceneMedium(card.ref.deck.bearer.deref()).isHovered = false;
      const playCardActivity = card.activities.find(a => PlayCardCommand.isPlayCardCommand(a));
      this._interactionService.unhighlightElementsV2(PlayCardCommand.asPlayCardCommand(playCardActivity).playCardCommandProcedureCache.values())
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

  private _updateProcedureCache(cards: Array<ICardOnPile & IDraggableCard>): void {
    for (let card of cards) {
      const playCardActivity = card.activities.find(a => PlayCardCommand.isPlayCardCommand(a));
      if (playCardActivity) {
        PlayCardCommand.asPlayCardCommand(playCardActivity).playCardCommandProcedureCache.clear();
        this._mappingService.extractInteractableMediumsFromProcedure(
          ProcedureFactory.asProcedure(playCardActivity),
          card.ref.deck.bearer.deref(),
          this._stateStore.currentState.board,
          PlayCardCommand.asPlayCardCommand(playCardActivity).playCardCommandProcedureCache
        );
      }
    }
  }

  private _clearProcedureCache(cards: Array<ICardOnPile & IDraggableCard>): void {
    for (let card of cards) {
      const playCardActivity = card.activities.find(a => PlayCardCommand.isPlayCardCommand(a));
      if (playCardActivity) {
        PlayCardCommand.asPlayCardCommand(playCardActivity).playCardCommandProcedureCache.clear();
      }
    } 
  }

}