import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameExitConfirmationModalComponent } from "./components/game-exit-confirmation-modal/game-exit-confirmation-modal.component";
import { GameMenuComponent } from "./components/game-menu/game-menu.component";


@NgModule({
  declarations: [
    GameMenuComponent,
    GameExitConfirmationModalComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    GameMenuComponent,
    GameExitConfirmationModalComponent,
  ]
})
export class MenusSharedModule { }