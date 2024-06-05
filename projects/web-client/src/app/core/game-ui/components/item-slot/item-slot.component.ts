import { Component, Input, OnInit } from '@angular/core';
import { IInventorySlot } from '@game-logic/lib/modules/items/entities/inventory-slot/inventory-slot.interface';
import { IInteractableMedium } from '../../mixins/interactable-medium/interactable-medium.interface';
import { IUiMedium } from '../../mixins/ui-medium/ui-medium.interface';
import { INarrativeMedium } from '../../mixins/narrative-medium/narrative-medium.interface';

import { DragService } from '../../services/drag.service';

@Component({
  selector: 'item-slot',
  templateUrl: './item-slot.component.html',
  styleUrls: ['./item-slot.component.scss']
})
export class ItemSlotComponent implements OnInit {

  @Input() slot: {
    item: IInteractableMedium & IUiMedium & INarrativeMedium,
    reservationItem: IInteractableMedium & IUiMedium & INarrativeMedium,
  } & IInventorySlot & IUiMedium & IInteractableMedium;

  @Input() displayAmount: boolean = true;

  constructor(
    private readonly _dragService: DragService 
  ) { }

  ngOnInit(): void { }
  
  public onDrop(e) {
    this._dragService.finishDraggingProcess(e)
  }

  public onDragStarted(e) {
    this._dragService.startDraggingProcess(e)
  }

  public onDragEnded(e) {
    this._dragService.interruptDraggingProcess(e)
  }

}
