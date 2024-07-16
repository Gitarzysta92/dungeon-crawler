import { NgModule } from "@angular/core";
import { CommandsService } from "./services/commands.service";
import { ContextCommandsBarComponent } from "./components/context-commands-bar/context-commands-bar.component";
import { GameUiSharedModule } from "../game-ui/game-ui.shared-module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    ContextCommandsBarComponent
  ],
  imports: [
    SharedModule,
    GameUiSharedModule
  ],
  providers: [
    CommandsService
  ], exports: [
    ContextCommandsBarComponent
  ]
})
export class GameSharedModule {}