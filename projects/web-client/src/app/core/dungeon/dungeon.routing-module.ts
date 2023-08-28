import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GameplayViewComponent } from "./components/gameplay-view/gameplay-view.component";
import { Dungeon } from "./dungeon.routing";

@NgModule({
  imports: [
    RouterModule.forChild(Dungeon.routes.bindComponents({
      dungeon: GameplayViewComponent
    }).toDefaultFormat())
  ],
  exports: [RouterModule]
})
export class DungeonRoutingModule { }