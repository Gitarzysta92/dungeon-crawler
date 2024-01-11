import { NgModule } from "@angular/core";
import { DungeonPlaygroundViewComponent } from "./components/dungeon-playground-view/dungeon-playground-view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DungeonLogicSharedModule } from "../dungeon-logic/dungeon-logic.shared-module";
import { DungeonSceneSharedModule } from "../dungeon-scene/dungeon-scene.shared-module";
import { DungeonUiSharedModule } from "../dungeon-ui/dungeon-ui.shared-module";
import { MenusSharedModule } from "../menus/menus.shared-module";
import { DungeonDevRoutingModule } from "./dungeon-dev.routing-module";
import { DungeonDevSharedModule } from "./dungeon-dev.shared-module";
import { DungeonSceneDevComponent } from './components/dungeon-scene-dev/dungeon-scene-dev.component';

@NgModule({
  declarations: [
    DungeonPlaygroundViewComponent,
    DungeonSceneDevComponent
  ],
  imports: [
    SharedModule,
    DungeonDevRoutingModule,
    DungeonLogicSharedModule,
    DungeonSceneSharedModule,
    DungeonUiSharedModule,
    MenusSharedModule,
    DungeonDevSharedModule
  ],
  providers: []
})
export class DungeonDevModule { }