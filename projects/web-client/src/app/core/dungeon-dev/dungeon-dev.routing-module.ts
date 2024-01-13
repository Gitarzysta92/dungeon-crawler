import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DungeonDev } from "./dungeon-dev.routing";
import { TileRotationDevViewComponent } from "./components/tile-rotation-dev-view/tile-rotation-dev-view.component";
import { BoardSelectorDevViewComponent } from "./components/board-selector-dev-view/board-selector-dev-view.component";
import { DungeonSceneDevComponent } from "./components/dungeon-scene-dev/dungeon-scene-dev.component";
import { DungeonPlaygroundViewComponent } from "./components/dungeon-playground-view/dungeon-playground-view.component";

@NgModule({
  imports: [
    RouterModule.forChild(DungeonDev.routes.bindComponents({
      playground: DungeonPlaygroundViewComponent,
      tileRotationDev: TileRotationDevViewComponent,
      boardSelectorDev: BoardSelectorDevViewComponent,
      sceneDev: DungeonSceneDevComponent
    }).toDefaultFormat())
  ],
  exports: [RouterModule]
})
export class DungeonDevRoutingModule { }