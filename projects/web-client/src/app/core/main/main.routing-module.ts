import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainMenuViewComponent } from "./components/main-menu-view/main-menu-view.component";
import { Main } from "./main.routing";


Main.routes.bindComponents({
  mainMenu: MainMenuViewComponent
});

@NgModule({
  imports: [RouterModule.forChild(Main.routes.toDefaultFormat())],
  exports: [RouterModule]
})
export class MainRoutingModule { }