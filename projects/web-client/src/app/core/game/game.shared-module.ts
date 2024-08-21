import { NgModule } from "@angular/core";
import { CommandService } from "./services/command.service";
import { ContextCommandsBarComponent } from "./components/context-commands-bar/context-commands-bar.component";
import { GameUiSharedModule } from "../game-ui/game-ui.shared-module";
import { SharedModule } from "src/app/shared/shared.module";
import { RewardViewComponent } from "./components/reward-view/reward-view.component";

@NgModule({
  declarations: [
    ContextCommandsBarComponent,
    RewardViewComponent,
  ],
  imports: [
    SharedModule,
    GameUiSharedModule
  ],
  exports: [
    ContextCommandsBarComponent,
    RewardViewComponent,
  ],
  providers: [
    CommandService
  ]
})
export class GameSharedModule {}