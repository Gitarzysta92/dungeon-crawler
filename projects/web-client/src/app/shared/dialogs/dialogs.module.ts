import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { NgModule } from "@angular/core";
import { NgScrollbarModule } from "ngx-scrollbar";
import { ButtonsModule } from "../buttons/buttons.module";
import { ModalComponent } from "./components/modal/modal.component";
import { PanelOriginComponent } from "./components/panel-origin/panel-origin.component";
import { PanelOverlayComponent } from "./components/panel-overlay/panel-overlay.component";
import { AttachedOverlayDirective } from "./directives/attached-overlay/attached-overlay.directive";
import { PanelOriginDirective } from "./directives/panel-origin.directive";

@NgModule({
  declarations: [
    ModalComponent,
    PanelOriginComponent,
    PanelOverlayComponent,
    AttachedOverlayDirective,
    PanelOriginDirective
  ],
  imports: [
    OverlayModule,
    NgScrollbarModule,
    PortalModule,
    ButtonsModule
  ],
  exports: [
    ModalComponent,
    PanelOriginComponent,
    PanelOverlayComponent,
    AttachedOverlayDirective,
    PanelOriginDirective
  ]
})
export class DialogsModule { }
  