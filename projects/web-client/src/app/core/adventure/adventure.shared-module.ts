import { NgModule } from "@angular/core";
import { AdventureStateStore } from "./stores/adventure-state.store";
import { AdventureGameplayStateFactoryService } from "./services/adventure-gameplay-state-factory.service";

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    AdventureGameplayStateFactoryService,
  ]
})
export class AdventureSharedModule {}