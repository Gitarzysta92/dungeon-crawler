import { NgModule } from "@angular/core";
import { CommandService } from "./services/command.service";
import { ContextCommandsBarComponent } from "./components/context-commands-bar/context-commands-bar.component";
import { GameUiSharedModule } from "../game-ui/game-ui.shared-module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    ContextCommandsBarComponent,
  ],
  imports: [
    SharedModule,
    GameUiSharedModule
  ],
  providers: [
    CommandService
  ],
  exports: [
    ContextCommandsBarComponent,
  ]
})
export class GameSharedModule {}