import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BurgerButtonComponent } from "./components/burger-button/burger-button.component";
import { CrossButtonComponent } from "./components/cross-button/cross-button.component";
import { CommonButtonComponent } from "./components/common-button/common-button.component";
import { VisibilityToggleButtonComponent } from './components/visibility-toggle-button/visibility-toggle-button.component';
import { IconsModule } from "../icons/icons.module";
import { MiscModule } from "../misc/misc.module";


@NgModule({
  declarations: [
    BurgerButtonComponent,
    CrossButtonComponent,
    CommonButtonComponent,
    VisibilityToggleButtonComponent
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
    VisibilityToggleButtonComponent
  ]
})
export class ButtonsModule { }
