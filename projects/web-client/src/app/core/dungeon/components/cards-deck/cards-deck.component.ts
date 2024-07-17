  import { Component, Input, OnInit } from '@angular/core';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { CARDS_OUTLET_DROP_LIST, DECK_DROP_LIST } from '../../constants/card-drop-list.constants';
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { CdkDrag, CdkDragEnter, CdkDropList } from '@angular/cdk/drag-drop';
import { ICard } from '@game-logic/lib/modules/cards/entities/card/card.interface';
import { ICardOnPile } from '@game-logic/lib/modules/cards/entities/cards-pile/cards-pile.interface';

@Component({
  selector: 'cards-deck',
  templateUrl: './cards-deck.component.html',
  styleUrls: ['./cards-deck.component.scss']
})
export class CardsDeckComponent implements OnInit {

  @Input() deck: IDeck;

  public dropListId = DECK_DROP_LIST
  public connectedTo = [CARDS_OUTLET_DROP_LIST]

  constructor(
    private readonly _dragService: DragService
  ) { }

  ngOnInit(): void {
  }

  public onDrop(e) {
    this._dragService.finishDraggingProcess(e)
  }

  public validateItemEnter(drag: CdkDrag, drop: CdkDropList): boolean {
    return !drop.data.isDisabled &&
      !drop.data.isReserved &&
      drop.data.isAbleToTakeItems(1, drag.data.item)
  }

  public onDropListEntered(e: CdkDragEnter<ICardOnPile & { ref: ICard }>) {
    console.log(e);
  }


}
