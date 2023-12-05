import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameplayCaptionComponent } from "./components/gameplay-caption/gameplay-caption.component";
import { DungeonLogComponent } from "./components/dungeon-log/dungeon-log.component";
import { PlayerControlComponent } from "./components/player-control/player-control.component";
import { PlayersOrderComponent } from "./components/players-order/players-order.component";
import { UiViewModelService } from "./services/ui-view-model/ui-view-model.service";
import { DungeonExitModalComponent } from "./components/dungeon-exit-modal/dungeon-exit-modal.component";
import { DungeonCardAcknowledgementModalComponent } from "./components/dungeon-card-acknowledgement-modal/dungeon-card-acknowledgement-modal.component";
import { ActorsListComponent } from "./components/actors-list/actors-list.component";
import { DungeonActivityLogStore } from "./stores/dungeon-activity-log.store";
import { DungeonUiStore } from "./stores/dungeon-ui.store";
import { UiInteractionService } from "./services/ui-interaction/ui-interaction.service";

@NgModule({
  declarations: [
    PlayersOrderComponent,
    PlayerControlComponent,
    DungeonLogComponent,
    GameplayCaptionComponent,
    DungeonExitModalComponent,
    DungeonCardAcknowledgementModalComponent,
    ActorsListComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    PlayersOrderComponent,
    PlayerControlComponent,
    DungeonLogComponent,
    GameplayCaptionComponent,
    DungeonExitModalComponent,
    DungeonCardAcknowledgementModalComponent,
    ActorsListComponent,
  ],
  providers: [
    UiViewModelService,
    DungeonUiStore,
    DungeonActivityLogStore,
    UiInteractionService,
  ]
})
export class DungeonUiSharedModule { }