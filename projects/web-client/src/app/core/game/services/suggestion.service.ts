import { Injectable } from "@angular/core";
import { ICommand } from "../interfaces/command.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IInventorySlot } from "@game-logic/lib/modules/items/entities/inventory-slot/inventory-slot.interface";
import { IInventory } from "@game-logic/lib/modules/items/entities/inventory/inventory.interface";
import { ISelectorDeclaration } from "@game-logic/lib/cross-cutting/selector/selector.interface";

@Injectable()
export class SuggestionService {
  stopHovering() {
    throw new Error('Method not implemented.');
  }
  allowHovering() {
    // throw new Error('Method not implemented.');
  }
  


  public showSmartSuggestion(items: Partial<IInteractableMedium & any>[]): void {
    for (let item of items) {
      if ('isHighlighted' in item) {
        item.isHighlighted = true;
      }
    }
  }

  public hideSmartSuggestion(items: Partial<IInteractableMedium & any>[]): any {
    for (let item of items) {
      if ('isHighlighted' in item) {
        item.isHighlighted = false;
      }
    }
  }


  public showSelectionRangeSuggestion(selectors: ISelectorDeclaration<unknown>): void {

  }


  public showCommandSuggestions(availableCommands: Array<ICommand & IInteractableMedium>): void {
    availableCommands.forEach(c => {
      c.isSelected = true;
      c.subject.isSelected = true;
    });
  }


  public hideCommandSuggestions(availableCommands: Array<ICommand & IInteractableMedium>): void {
    availableCommands.forEach(c => {
      c.isSelected = false;
      c.subject.isSelected = false;
    });
  }


  public displayItemTransferSuggestions(fromSlot: IInventorySlot, inventory: IInventory): void {
    if (!fromSlot.item) {
      throw new Error("Cannot drag item of empty slot");
    }

    for (let toSlot of inventory.slots as Array<IInventorySlot & IInteractableMedium>) {
      toSlot.isSelected = false;

      if (inventory.validateRedistribution([{ from: fromSlot, to: toSlot, amount: 1 }])) {
        toSlot.isSelected = true;
      }
      //console.log(toSlot.isHighlighted)
    }
  }

  public hideItemTransferSuggestions(slots: IInventorySlot[]): void {
    for (let slot of slots as Array<IInventorySlot & IInteractableMedium>) {
      slot.isSelected = false;
    }
  }


}