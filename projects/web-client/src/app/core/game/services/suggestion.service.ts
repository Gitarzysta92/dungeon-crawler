import { Injectable } from "@angular/core";
import { ICommand } from "../interfaces/command.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";

@Injectable()
export abstract class SuggestionService {

  hideSuggestions(availableCommands: Array<ICommand & IInteractableMedium>): void {
    availableCommands.forEach(c => {
      c.isHighlighted = true;
      c.subject.isHighlighted = true;
    });
  }

  displaySuggestions(availableCommands: Array<ICommand & IInteractableMedium>) {
    availableCommands.forEach(c => {
      c.isHighlighted = true;
      c.subject.isHighlighted = true;
    });
  }

}