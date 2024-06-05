import { Injectable } from "@angular/core";
import { ICommand } from "../interfaces/command.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IInventorySlot } from "@game-logic/lib/modules/items/entities/inventory-slot/inventory-slot.interface";
import { IInventory } from "@game-logic/lib/modules/items/entities/inventory/inventory.interface";

@Injectable()
export class SuggestionService {


  public displaySuggestions(availableCommands: Array<ICommand & IInteractableMedium>): void {
    availableCommands.forEach(c => {
      c.isHighlighted = true;
      c.subject.isHighlighted = true;
    });
  }

  public hideSuggestions(availableCommands: Array<ICommand & IInteractableMedium>): void {
    availableCommands.forEach(c => {
      c.isHighlighted = false;
      c.subject.isHighlighted = false;
    });
  }


  public displayItemTransferSuggestions(fromSlot: IInventorySlot, inventory: IInventory): void {
    if (!fromSlot.item) {
      throw new Error("Cannot drag item of empty slot");
    }

    for (let toSlot of inventory.slots as Array<IInventorySlot & IInteractableMedium>) {
      toSlot.isHighlighted = false;

      if (inventory.validateRedistribution([{ from: fromSlot, to: toSlot, amount: 1 }])) {
        toSlot.isHighlighted = true;
      }
      //console.log(toSlot.isHighlighted)
    }
  }

  public hideItemTransferSuggestions(slots: IInventorySlot[]): void {
    for (let slot of slots as Array<IInventorySlot & IInteractableMedium>) {
      slot.isHighlighted = false;
    }
  }


}