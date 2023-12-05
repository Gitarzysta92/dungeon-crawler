import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Development } from "./development.routing";
import { DevelopmentViewComponent } from "./components/development-view/development-view.component";

@NgModule({
  imports: [
    RouterModule.forChild(Development.routes.bindComponents({
      root: DevelopmentViewComponent
    }).toDefaultFormat())
  ],
  exports: [RouterModule]
})
export class DevelopmentRoutingModule { }