import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameplayCaptionComponent } from "./components/gameplay-caption/gameplay-caption.component";
import { DungeonLogComponent } from "./components/dungeon-log/dungeon-log.component";
import { PlayerControlComponent } from "./components/player-control/player-control.component";
import { PlayersOrderComponent } from "./components/players-order/players-order.component";
import { DungeonExitModalComponent } from "./components/dungeon-exit-modal/dungeon-exit-modal.component";
import { DungeonCardAcknowledgementModalComponent } from "./components/dungeon-card-acknowledgement-modal/dungeon-card-acknowledgement-modal.component";
import { ActorsListComponent } from "./components/actors-list/actors-list.component";
import { DungeonActivityLogStore } from "./stores/dungeon-activity-log.store";
import { DungeonUiStore } from "./stores/dungeon-ui.store";
import { BoardObjectModalService } from "./services/board-object-modal.service";
import { BoardObjectModalComponent } from "./components/board-object-modal/board-object-modal.component";
import { AssetsLoaderModule } from "src/app/infrastructure/asset-loader/asset-loader.module";
import { InfoPanelComponent } from "./components/info-panel/info-panel.component";
import { StatsTableComponent } from "./components/stats-table/stats-table.component";
import { AbilitySlotComponent } from "./components/ability-slot/ability-slot.component";
import { PerkSlotComponent } from "./components/perk-slot/perk-slot.component";
import { HeroAvatarFrameComponent } from "./components/hero-avatar-frame/hero-avatar-frame.component";
import { RolloverSoundDirective } from "./directives/rollover-sound/rollover-sound.directive";
import { ConfirmationModalComponent } from "./components/confirmation-modal/confirmation-modal.component";

@NgModule({
  declarations: [
    PlayersOrderComponent,
    PlayerControlComponent,
    DungeonLogComponent,
    GameplayCaptionComponent,
    DungeonExitModalComponent,
    DungeonCardAcknowledgementModalComponent,
    ActorsListComponent,
    BoardObjectModalComponent,
    InfoPanelComponent,
    StatsTableComponent,
    AbilitySlotComponent,
    PerkSlotComponent,
    HeroAvatarFrameComponent,
    RolloverSoundDirective,
    ConfirmationModalComponent
  ],
  imports: [
    SharedModule,
    AssetsLoaderModule
  ],
  exports: [
    PlayersOrderComponent,
    PlayerControlComponent,
    DungeonLogComponent,
    GameplayCaptionComponent,
    DungeonExitModalComponent,
    DungeonCardAcknowledgementModalComponent,
    ActorsListComponent,
    BoardObjectModalComponent,
    StatsTableComponent,
    AbilitySlotComponent,
    PerkSlotComponent,
    HeroAvatarFrameComponent,
    RolloverSoundDirective,
    ConfirmationModalComponent
  ],
  providers: [
    DungeonUiStore,
    DungeonActivityLogStore,
    BoardObjectModalService
  ]
})
export class GameUiSharedModule { }