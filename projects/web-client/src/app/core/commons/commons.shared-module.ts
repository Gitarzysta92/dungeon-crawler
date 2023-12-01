import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { MobileMenuButtonComponent } from "./components/mobile-menu-button/mobile-menu-button.component";
import { NotFoundViewComponent } from "./components/not-found-view/not-found-view.component";

@NgModule({
  declarations: [
    MobileMenuButtonComponent,
    NotFoundViewComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    MobileMenuButtonComponent, 
    NotFoundViewComponent
  ]
})
export class CommonsSharedModule { }