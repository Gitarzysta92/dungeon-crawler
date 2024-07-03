import { NgModule } from "@angular/core";
import { SuggestionService } from "./services/suggestion.service";
import { CommandsService } from "./services/commands.service";

@NgModule({
  providers: [
    CommandsService
  ]
})
export class GameSharedModule {}