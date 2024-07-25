import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { DECK_DROP_LIST } from '../../constants/card-drop-list.constants';
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

@Component({
  selector: 'cards-deck',
  templateUrl: './cards-deck.component.html',
  styleUrls: ['./cards-deck.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':leave', [
        style({ transform: "scale(1) rotate(0)" }),
        animate('0.2s ease-in', style({ transform: "scale(0) rotate(-360deg)" }))
      ])
    ])
  ]
})
export class CardsDeckComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkDropList) _deckDropList: CdkDropList
  @Input() deck: IDeck;

  public cards: Array<ICardOnPile & { ref: ICard }>
  public dropListId = DECK_DROP_LIST;
  public isHovered = false;

  public trashedCards: Map<ICardOnPile, ICardOnPile>

  constructor(
    private readonly _dragService: DragService,
    private readonly _stateStore: DungeonStateStore,
    private readonly _commandsService: CommandService,
    private readonly _humanPlayerService: HumanPlayerService
  ) { }
 
  ngOnInit(): void {
    this._stateStore.state$.subscribe(s => {
      if (!this.trashedCards) {
        this.trashedCards = new Map();
        for (let c of this.deck.trashPile.pile) {
          this.trashedCards.set(c, c);
        }
      } else {
        this.cards = this.deck.trashPile.pile.filter(p => !this.trashedCards.has(p));
        for (let c of this.cards) {
          this.trashedCards.set(c, c);
        }
        setTimeout(() => this.cards = [], 0);
      }
    })
  }

  ngAfterViewInit(): void {
    this._dragService.registerDropList(this._deckDropList);
  }

  ngOnChanges(): void {
   
  }

  public validateItemEnter(): Function {
    return (drag: CdkDrag<ICardOnPile>, drop: CdkDropList): boolean => {
      const pawn = this._stateStore.currentState.getCurrentPlayerSelectedPawn<IDeckBearer>();
      return drag.data.activities.some(a => a.canBeDone(pawn) && (a.id === TRASH_CARD_ACTIVITY || a.id === DISCARD_CARD_ACTIVITY));
    }
  }

  public onDragReleased(e: CdkDragRelease<ICardOnPile & { ref: ICard }>) {
 
  }

  public onDrop(e: CdkDragDrop<unknown, unknown, ICardOnPile & { ref: ICard }>) {
    this._commandsService.executeCommand(e.item.data.activities, this._stateStore, this._humanPlayerService);
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
