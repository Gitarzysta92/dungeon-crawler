import { NgModule } from "@angular/core";
import { DungeonPlaygroundViewComponent } from "./components/dungeon-playground-view/dungeon-playground-view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { GameLogicSharedModule } from "../game-logic/game-logic.shared-module";
import { DungeonSceneSharedModule } from "../dungeon-scene/dungeon-scene.shared-module";
import { GameUiSharedModule } from "../game-ui/game-ui.shared-module";
import { MenusSharedModule } from "../menus/menus.shared-module";
import { DungeonDevRoutingModule } from "./dungeon-dev.routing-module";
import { DungeonDevSharedModule } from "./dungeon-dev.shared-module";
import { TileRotationDevViewComponent } from './components/tile-rotation-dev-view/tile-rotation-dev-view.component';
import { BoardSelectorDevViewComponent } from './components/board-selector-dev-view/board-selector-dev-view.component';
import { BoardObjectModalEditorComponent } from './components/board-object-modal-editor/board-object-modal-editor.component';
import { DungeonSceneDevComponent } from './components/dungeon-scene-dev/dungeon-scene-dev.component';

@NgModule({
  declarations: [
    DungeonPlaygroundViewComponent,
    TileRotationDevViewComponent,
    BoardSelectorDevViewComponent,
    BoardObjectModalEditorComponent,
    DungeonSceneDevComponent
  ],
  imports: [
    SharedModule,
    DungeonDevRoutingModule,
    GameLogicSharedModule,
    DungeonSceneSharedModule,
    GameUiSharedModule,
    MenusSharedModule,
    DungeonDevSharedModule
  ],
  providers: []
})
export class DungeonDevModule { }