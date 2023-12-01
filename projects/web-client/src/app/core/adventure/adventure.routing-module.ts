import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Adventure } from "./adventure.routing";
import { AdventureViewComponent } from "./api";
import { HallViewComponent } from "./components/hall-view/hall-view.component";
import { CharacterViewComponent } from "./components/character-view/character-view.component";
import { DungeonAreaViewComponent } from "./components/dungeon-area-view/dungeon-area-view.component";
import { BuildingAreaViewComponent } from "./components/building-area-view/building-area-view.component";


Adventure.routes.bindComponents({
  town: {
    _: AdventureViewComponent,
    hall: HallViewComponent,
    building: BuildingAreaViewComponent,
    character: CharacterViewComponent
  },
  dungeon: DungeonAreaViewComponent
});

@NgModule({
  imports: [RouterModule.forChild(Adventure.routes.toDefaultFormat())],
  exports: [RouterModule]
})
export class AdventureRoutingModule { }