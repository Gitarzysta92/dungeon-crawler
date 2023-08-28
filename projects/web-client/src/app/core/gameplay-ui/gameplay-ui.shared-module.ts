import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameExitConfirmationModalComponent } from "./components/game-exit-confirmation-modal/game-exit-confirmation-modal.component";
import { GameMenuComponent } from "./components/game-menu/game-menu.component";
import { GameplayCaptionComponent } from "./components/gameplay-caption/gameplay-caption.component";
import { GameplayLogComponent } from "./components/gameplay-log/gameplay-log.component";
import { PlayerControlComponent } from "./components/player-control/player-control.component";
import { PlayersOrderComponent } from "./components/players-order/players-order.component";
import { PlayersScoreComponent } from "./components/players-score/players-score.component";

@NgModule({
  declarations: [
    PlayersScoreComponent,
    PlayersOrderComponent,
    PlayerControlComponent,
    GameplayLogComponent,
    GameplayCaptionComponent,
    GameMenuComponent,
    GameExitConfirmationModalComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    PlayersScoreComponent,
    PlayersOrderComponent,
    PlayerControlComponent,
    GameplayLogComponent,
    GameplayCaptionComponent,
    GameMenuComponent,
    GameExitConfirmationModalComponent
  ],
  providers: [
    // PlayersScoreComponent,
    // PlayersOrderComponent,
    // PlayerControlComponent,
    // GameplayLogComponent,
    // GameplayCaptionComponent,
    // GameMenuComponent,
    //GameExitConfirmationModalComponent,
  ]
})
export class GameplayUiSharedModule { }