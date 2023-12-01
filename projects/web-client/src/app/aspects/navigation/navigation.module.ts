import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { NavigationalMenuComponent } from "./components/navigational-menu/navigational-menu.component";

@NgModule({
  declarations: [
    NavigationalMenuComponent 
  ],
  imports: [
    SharedModule
  ],
  exports: [
    NavigationalMenuComponent 
  ]
})
export class NavigationModule { }