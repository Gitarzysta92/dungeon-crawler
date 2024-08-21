import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IInteractableMedium } from '../../mixins/interactable-medium/interactable-medium.interface';
import { IUiMedium } from '../../mixins/ui-medium/ui-medium.interface';
import { IEquipableItem } from '@game-logic/lib/modules/items/entities/item/item.interface';
import { IInventorySlot } from '@game-logic/lib/modules/items/mixins/inventory-slot/inventory-slot.interface';

@Component({
  selector: 'equipment-grid',
  templateUrl: './equipment-grid.component.html',
  styleUrls: ['./equipment-grid.component.scss']
})
export class EquipmentGridComponent implements OnInit, OnChanges {

  @Input() slots: Array<IInventorySlot & IUiMedium & IInteractableMedium>;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this._disableOccupiedSecondarySlots(this.slots);
  }

  ngOnInit(): void {}

  private _disableOccupiedSecondarySlots(slots: Array<IInventorySlot & IUiMedium & IInteractableMedium>) {
    for (let slot of slots) {
      slot.isDisabled = false;
    }

    for (let slot of slots) {
      if (slot.isOccupied && !slot.isDisabled) {
        const item = slot.item as IEquipableItem;
        const reservedSlots = this.slots.filter(s => item.reservedSlotIds.includes(s.id))
        for (let sslot of reservedSlots) {
          sslot.isDisabled = true
        }
      }
    }
  }

}
