import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DungeonLogComponent } from "../dungeon/components/dungeon-log/dungeon-log.component";
import { DungeonExitModalComponent } from "../dungeon/components/dungeon-exit-modal/dungeon-exit-modal.component";
import { ActorsListComponent } from "../dungeon/components/actors-list/actors-list.component";
import { BoardObjectModalService } from "./services/board-object-modal.service";
import { AssetsLoaderModule } from "src/app/infrastructure/asset-loader/asset-loader.module";
import { InfoPanelComponent } from "./components/info-panel/info-panel.component";
import { StatsTableComponent } from "./components/stats-table/stats-table.component";
import { AbilitySlotComponent } from "./components/ability-slot/ability-slot.component";
import { PerkSlotComponent } from "./components/perk-slot/perk-slot.component";
import { HeroAvatarFrameComponent } from "./components/hero-avatar-frame/hero-avatar-frame.component";
import { RolloverSoundDirective } from "./directives/rollover-sound/rollover-sound.directive";
import { ConfirmationModalComponent } from "./components/confirmation-modal/confirmation-modal.component";
import { PortalModule } from "@angular/cdk/portal";
import { HeroBarComponent } from "./components/hero-bar/hero-bar.component";
import { AuxiliaryViewComponent } from "./components/auxiliary-view/auxiliary-view.component";
import { RouterModule } from "@angular/router";
import { InventoryGridComponent } from "./components/inventory-grid/inventory-grid.component";
import { EquipmentGridComponent } from "./components/equipment-grid/equipment-grid.component";
import { ItemSlotComponent } from "./components/item-slot/item-slot.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormPanelComponent } from "./components/form-panel/form-panel.component";
import { ContextBarComponent } from "./components/context-bar/context-bar.component";
import { HeroPortraitComponent } from "./components/hero-portrait/hero-portrait.component";
import { HeroicSlotComponent } from "./components/heroic-slot/heroic-slot.component";
import { CardContainerComponent } from "./components/card-container/card-container.component";
import { UiEffectsCanvasComponent } from "./components/ui-effects-canvas/ui-effects-canvas.component";
import { PointerService } from "./services/pointer.service";

@NgModule({
  declarations: [
    DungeonLogComponent,
    DungeonExitModalComponent,
    ActorsListComponent,
    InfoPanelComponent,
    StatsTableComponent,
    AbilitySlotComponent,
    PerkSlotComponent,
    HeroAvatarFrameComponent,
    RolloverSoundDirective,
    ConfirmationModalComponent,
    HeroBarComponent,
    AuxiliaryViewComponent,
    InventoryGridComponent,
    EquipmentGridComponent,
    ItemSlotComponent,
    FormPanelComponent,
    ContextBarComponent,
    HeroPortraitComponent,
    HeroicSlotComponent,
    CardContainerComponent,
    UiEffectsCanvasComponent
  ],
  imports: [
    SharedModule,
    AssetsLoaderModule,
    PortalModule,
    RouterModule,
    DragDropModule
  ],
  exports: [
    DungeonLogComponent,
    DungeonExitModalComponent,
    ActorsListComponent,
    StatsTableComponent,
    AbilitySlotComponent,
    PerkSlotComponent,
    HeroAvatarFrameComponent,
    RolloverSoundDirective,
    ConfirmationModalComponent,
    PortalModule,
    HeroBarComponent,
    AuxiliaryViewComponent,
    InventoryGridComponent,
    EquipmentGridComponent,
    ItemSlotComponent,
    DragDropModule,
    FormPanelComponent,
    ContextBarComponent,
    HeroPortraitComponent,
    HeroicSlotComponent,
    CardContainerComponent,
    UiEffectsCanvasComponent
  ],
  providers: [
    BoardObjectModalService,
    PointerService
  ]
})
export class GameUiSharedModule { }