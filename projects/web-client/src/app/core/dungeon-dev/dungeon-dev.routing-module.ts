import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DungeonDev } from "./dungeon-dev.routing";
import { DungeonSceneDevComponent } from "./components/dungeon-scene-dev/dungeon-scene-dev.component";

@NgModule({
  imports: [
    RouterModule.forChild(DungeonDev.routes.bindComponents({
      playground: DungeonSceneDevComponent
    }).toDefaultFormat())
  ],
  exports: [RouterModule]
})
export class DungeonDevRoutingModule { }