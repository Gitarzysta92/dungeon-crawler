import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DungeonPlaygroundViewComponent } from "./components/dungeon-playground-view/dungeon-playground-view.component";
import { DungeonDev } from "./dungeon-dev.routing";
import { TileRotationDevViewComponent } from "./components/tile-rotation-dev-view/tile-rotation-dev-view.component";

@NgModule({
  imports: [
    RouterModule.forChild(DungeonDev.routes.bindComponents({
      playground: DungeonPlaygroundViewComponent,
      tileRotationDev: TileRotationDevViewComponent
    }).toDefaultFormat())
  ],
  exports: [RouterModule]
})
export class DungeonDevRoutingModule { }