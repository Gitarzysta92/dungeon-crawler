import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DungeonPlaygroundViewComponent } from "./components/dungeon-playground-view/dungeon-playground-view.component";
import { DungeonDev } from "./dungeon-dev.routing";

@NgModule({
  imports: [
    RouterModule.forChild(DungeonDev.routes.bindComponents({
      playground: DungeonPlaygroundViewComponent
    }).toDefaultFormat())
  ],
  exports: [RouterModule]
})
export class DungeonDevRoutingModule { }