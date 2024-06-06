import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IHero } from '@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface';
import { InventorySlotType } from '@game-logic/lib/modules/items/entities/inventory-slot/inventory-slot.constants';
import { IUiMedium } from 'src/app/core/game-ui/mixins/ui-medium/ui-medium.interface';
import { IInventorySlot } from "@game-logic/lib/modules/items/entities/inventory-slot/inventory-slot.interface";
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { SuggestionService } from '../../services/suggestion.service';
import { IInteractableMedium } from 'src/app/core/game-ui/mixins/interactable-medium/interactable-medium.interface';


@Component({
  selector: 'hero-view',
  templateUrl: './hero-view.component.html',
  styleUrls: ['./hero-view.component.scss'],
  providers: [
    DragService,
    SuggestionService
  ]
})
export class HeroViewComponent implements OnInit, OnChanges {

  @Input() hero: IUiMedium & IHero;
  commonSlots: Array<IInventorySlot & IInteractableMedium>;
  equipmentSlots: Array<IInventorySlot & IInteractableMedium>;

  constructor(
    private readonly _dragService: DragService,
    private readonly _suggestionService: SuggestionService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.commonSlots = this.hero.inventory.slots.filter(s => s.slotType === InventorySlotType.Common) as  Array<IInventorySlot & IInteractableMedium>;
    this.equipmentSlots = this.hero.inventory.slots.filter(s => s.slotType === InventorySlotType.Equipment) as  Array<IInventorySlot & IInteractableMedium>;
  }

  ngOnInit(): void {
    this._dragService.listenForDraggingProcess<IInventorySlot>()
      //.pipe(finalize(() => this._suggestionService.hideItemTransferSuggestions(this.hero.inventory.slots)))
      .subscribe(p => {
        this._suggestionService.displayItemTransferSuggestions(p.from, this.hero.inventory)
      })
    
    this._dragService.listenForDraggingProcessFinished<IInventorySlot>()
      //.pipe(finalize(() => this._suggestionService.hideItemTransferSuggestions(this.hero.inventory.slots)))
      .subscribe(p => {
        if (p.from && p.to) {
          this.hero.inventory.redistributeItems([{ from: p.from, to: p.to, amount: 1 }])
        }
        //console.log(this.hero.inventory.items)
        this._suggestionService.hideItemTransferSuggestions(this.hero.inventory.slots)
      })
  }

  public equipItem(e: any) {
    console.log(e);
  }

}

