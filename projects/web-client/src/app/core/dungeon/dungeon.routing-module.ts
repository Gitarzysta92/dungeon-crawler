import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DungeonViewComponent } from "./components/dungeon-view/dungeon-view.component";
import { Dungeon } from "./dungeon.routing";
import { DungeonSummaryViewComponent } from "./components/dungeon-summary-view/dungeon-summary-view.component";

@NgModule({
  imports: [
    RouterModule.forChild(Dungeon.routes.bindComponents({
      dungeon: DungeonViewComponent,
      dungeonSummary: DungeonSummaryViewComponent
    }).toDefaultFormat())
  ],
  exports: [RouterModule]
})
export class DungeonRoutingModule { }