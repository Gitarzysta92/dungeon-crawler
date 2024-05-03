import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BurgerButtonComponent } from "./components/burger-button/burger-button.component";
import { CrossButtonComponent } from "./components/cross-button/cross-button.component";
import { CommonButtonComponent } from "./components/common-button/common-button.component";
import { VisibilityToggleButtonComponent } from './components/visibility-toggle-button/visibility-toggle-button.component';
import { IconsModule } from "../icons/icons.module";
import { MiscModule } from "../misc/misc.module";
import { CommonCtaButtonComponent } from './components/common-cta-button/common-cta-button.component';


@NgModule({
  declarations: [
    BurgerButtonComponent,
    CrossButtonComponent,
    CommonButtonComponent,
    VisibilityToggleButtonComponent,
    CommonCtaButtonComponent
  ],
  imports: [
    MiscModule,
    CommonModule,
    IconsModule
  ],
  exports: [
    BurgerButtonComponent,
    CrossButtonComponent,
    CommonButtonComponent,
    VisibilityToggleButtonComponent,
    CommonCtaButtonComponent
  ]
})
export class ButtonsModule { }
