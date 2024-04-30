import { NgModule } from "@angular/core";
import { AdventureStateStore } from "./stores/adventure-state.store";
import { AdventureGameplayStateFactory } from "./state/adventure-gameplay-state.factory";

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    AdventureGameplayStateFactory,
    AdventureStateStore
  ]
})
export class AdventureSharedModule {}