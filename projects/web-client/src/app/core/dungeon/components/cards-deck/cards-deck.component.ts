import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'cards-deck',
  templateUrl: './cards-deck.component.html',
  styleUrls: ['./cards-deck.component.scss']
})
export class CardsDeckComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkDropList) _deckDropList: CdkDropList
  @Input() deck: IDeck;

  public dropListId = DECK_DROP_LIST;

  public isHovered = false;

  constructor(
    private readonly _dragService: DragService,
    private readonly _stateStore: DungeonStateStore,
    private readonly _commandsService: CommandService,
    private readonly _humanPlayerService: HumanPlayerService
  ) { }
 
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._dragService.registerDropList(this._deckDropList);
  }

  public validateItemEnter(): Function {
    return (drag: CdkDrag<ICardOnPile>, drop: CdkDropList): boolean => {
      const pawn = this._stateStore.currentState.getCurrentPlayerSelectedPawn<IDeckBearer>();
      return drag.data.activities.some(a => a.canBeDone(pawn) && (a.id === TRASH_CARD_ACTIVITY || a.id === DISCARD_CARD_ACTIVITY));
    }
  }

  public onDrop(e: CdkDragDrop<unknown, unknown, ICardOnPile & { ref: ICard }>) {
    this._commandsService.executeCommand(e.item.data.activities, this._stateStore, this._humanPlayerService);
    this._dragService.finishDraggingProcess(e)
  }


  public onDropListEntered(e: CdkDragEnter<ICardOnPile & { ref: ICard }>) {
    this.isHovered = true;
    console.log(e);
  }

  public onDropListExited(e: CdkDragEnter<ICardOnPile & { ref: ICard }>) {
    this.isHovered = false;
    console.log(e);
  }

}
