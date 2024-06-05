import { NgModule } from "@angular/core";
import { DungeonPlaygroundViewComponent } from "./components/dungeon-playground-view/dungeon-playground-view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { GameLogicSharedModule } from "../../core/game-logic/game-logic.shared-module";
import { SceneSharedModule } from "../../core/scene/scene.shared-module";
import { GameUiSharedModule } from "../../core/game-ui/game-ui.shared-module";
import { MenusSharedModule } from "../../core/menus/menus.shared-module";
import { DungeonDevRoutingModule } from "./dungeon-dev.routing-module";
import { DungeonDevSharedModule } from "./dungeon-dev.shared-module";
import { TileRotationDevViewComponent } from './components/tile-rotation-dev-view/tile-rotation-dev-view.component';
import { BoardSelectorDevViewComponent } from './components/board-selector-dev-view/board-selector-dev-view.component';
import { BoardObjectModalEditorComponent } from './components/board-object-modal-editor/board-object-modal-editor.component';
import { DungeonSceneDevComponent } from './components/dungeon-scene-dev/dungeon-scene-dev.component';
import { MenuSceneViewComponent } from './components/menu-scene-view/menu-scene-view.component';
import { AdventurePlaygroundViewComponent } from './components/adventure-playground-view/adventure-playground-view.component';

@NgModule({
  declarations: [
    DungeonPlaygroundViewComponent,
    TileRotationDevViewComponent,
    BoardSelectorDevViewComponent,
    BoardObjectModalEditorComponent,
    DungeonSceneDevComponent,
    MenuSceneViewComponent,
    AdventurePlaygroundViewComponent
  ],
  imports: [
    SharedModule,
    DungeonDevRoutingModule,
    GameLogicSharedModule,
    SceneSharedModule,
    GameUiSharedModule,
    MenusSharedModule,
    DungeonDevSharedModule
  ],
  providers: []
})
export class DungeonDevModule { }