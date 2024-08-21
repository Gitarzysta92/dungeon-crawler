import { Component, Input, OnInit } from '@angular/core';
import { IInventorySlot } from '@game-logic/lib/modules/items/mixins/inventory-slot/inventory-slot.interface';


@Component({
  selector: 'inventory-grid',
  templateUrl: './inventory-grid.component.html',
  styleUrls: ['./inventory-grid.component.scss']
})
export class InventoryGridComponent implements OnInit {

  @Input() slots: IInventorySlot[];

  constructor() { }

  ngOnInit(): void { }

}
