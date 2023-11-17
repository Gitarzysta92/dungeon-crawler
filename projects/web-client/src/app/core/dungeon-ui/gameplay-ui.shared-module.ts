import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameplayCaptionComponent } from "./components/gameplay-caption/gameplay-caption.component";
import { DungeonLogComponent } from "./components/dungeon-log/dungeon-log.component";
import { PlayerControlComponent } from "./components/player-control/player-control.component";
import { PlayersOrderComponent } from "./components/players-order/players-order.component";
import { PlayersScoreComponent } from "./components/players-score/players-score.component";
import { UiViewModelService } from "./services/ui-view-model/ui-view-model.service";
import { DungeonExitModalComponent } from "./components/dungeon-exit-modal/dungeon-exit-modal.component";
import { DungeonCardAcknowledgementModalComponent } from "./components/dungeon-card-acknowledgement-modal/dungeon-card-acknowledgement-modal.component";

@NgModule({
  declarations: [
    PlayersScoreComponent,
    PlayersOrderComponent,
    PlayerControlComponent,
    DungeonLogComponent,
    GameplayCaptionComponent,
    DungeonExitModalComponent,
    DungeonCardAcknowledgementModalComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    PlayersScoreComponent,
    PlayersOrderComponent,
    PlayerControlComponent,
    DungeonLogComponent,
    GameplayCaptionComponent,
    DungeonExitModalComponent,
    DungeonCardAcknowledgementModalComponent,
  ],
  providers: [
    UiViewModelService
  ]
})
export class GameplayUiSharedModule { }