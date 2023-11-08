import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DungeonViewComponent } from "./components/dungeon-view/dungeon-view.component";
import { Dungeon } from "./dungeon.routing";

@NgModule({
  imports: [
    RouterModule.forChild(Dungeon.routes.bindComponents({
      dungeon: DungeonViewComponent
    }).toDefaultFormat())
  ],
  exports: [RouterModule]
})
export class DungeonRoutingModule { }