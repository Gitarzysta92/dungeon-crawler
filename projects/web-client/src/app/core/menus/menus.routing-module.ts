import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainMenuViewComponent } from "./components/main-menu-view/main-menu-view.component";
import { Menus } from "./menus.routing";


Menus.routes.bindComponents({
  mainMenu: MainMenuViewComponent
});

@NgModule({
  imports: [RouterModule.forChild(Menus.routes.toDefaultFormat())],
  exports: [RouterModule]
})
export class MenusRoutingModule { }