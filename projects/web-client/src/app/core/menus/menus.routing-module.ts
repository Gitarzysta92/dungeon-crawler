import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Menus } from "./menus.routing";
import { MenusViewComponent } from "./components/menus-view/menus-view.component";
import { MainMenuViewComponent } from "./components/main-menu-view/main-menu-view.component";


Menus.routes.bindComponents({
  menus: MenusViewComponent,
  mainMenu: MainMenuViewComponent
});

@NgModule({
  imports: [RouterModule.forChild(Menus.routes.toDefaultFormat())],
  exports: [RouterModule]
})
export class MenusRoutingModule { }