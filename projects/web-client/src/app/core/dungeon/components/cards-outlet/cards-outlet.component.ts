import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { CommandsService } from 'src/app/core/game/services/commands.service';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { ICard } from '@game-logic/lib/modules/cards/entities/card/card.interface';
import { HumanPlayerService } from '../../services/human-player.service';
import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragRelease, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { CARDS_OUTLET_DROP_LIST, DECK_DROP_LIST } from '../../constants/card-drop-list.constants';
import { ICardOnPile } from '@game-logic/lib/modules/cards/entities/cards-pile/cards-pile.interface';


@Component({
  selector: 'cards-outlet',
  templateUrl: './cards-outlet.component.html',
  styleUrls: ['./cards-outlet.component.scss']
})
export class CardsOutletComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChildren("cardWrapper", {read: ElementRef}) cardWrappers: QueryList<ElementRef>
  @Input() deck: IDeck;

  public cards: Array<ICardOnPile & { ref: ICard }>

  public dropListId = CARDS_OUTLET_DROP_LIST;
  public connectedTo = [DECK_DROP_LIST]
  public draggingCard: ICard;

  private _tiltNumbers: number[] = [];
  private _tiltFactor: number = 5;

  constructor(
    private readonly _commandsService: CommandsService,
    private readonly _dungeonStore: DungeonStateStore,
    private readonly _humanPlayerService: HumanPlayerService,
    private readonly _renderer2: Renderer2,
    private readonly _dragService: DragService
  ) { }
  
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this._updateCardsTilt()
  }

  ngOnChanges(): void {
    this.cards = this.deck.hand.pile.map(c => Object.assign(c, { ref: this.deck.cards.find(card => card.id === c.id) }));
    this._updateCardsTilt()
  }
  

  public validateItemEnter(drag: CdkDrag, drop: CdkDropList): boolean {
    return true;
  }

  public onDrop(e: CdkDragDrop<ICardOnPile & { ref: ICard }>) {
    moveItemInArray(this.cards, e.previousIndex, e.currentIndex);
    setTimeout(() => this._updateCardsTilt(), 0);
    this._dragService.finishDraggingProcess(e);
  }

  public onDragReleased(e: CdkDragRelease<ICardOnPile & { ref: ICard }>) {
    //console.log(e);
  }

  public onDragStarted(e) {
    this.draggingCard = e.source.data
    this._dragService.startDraggingProcess(e)
  }

  public onDragEnded(e: CdkDragEnd<ICardOnPile & { ref: ICard }>) {
    this.draggingCard = null;
    this._dragService.interruptDraggingProcess(e)
  }

  private _updateCardsTilt(): void {
    if (!this.cardWrappers) {
      return;
    }
    const tilts = this._calculateTilts(this.cards.length);
    this.cardWrappers.forEach((item, i) => this._applyTilt(item, tilts[i]));
  }

  private _applyTilt(i: ElementRef, tilt: number): void {
    this._renderer2.setStyle(i.nativeElement, "transform", `rotate(${tilt}deg) translateY(${Math.abs(tilt)}%)`)
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