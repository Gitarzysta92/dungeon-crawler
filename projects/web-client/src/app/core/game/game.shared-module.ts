import { NgModule } from "@angular/core";
import { SuggestionService } from "./services/suggestion.service";
import { InteractionService } from "./services/interaction.service";

@NgModule({
  providers: [
    InteractionService
  ]
})
export class GameSharedModule {}