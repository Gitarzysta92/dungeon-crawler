import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Adventure } from "./adventure.routing";
import { HallViewComponent } from "./components/hall-view/hall-view.component";


Adventure.routes.bindComponents({
  root: HallViewComponent
});

@NgModule({
  imports: [RouterModule.forChild(Adventure.routes.toDefaultFormat())],
  exports: [RouterModule]
})
export class AdventureRoutingModule { }