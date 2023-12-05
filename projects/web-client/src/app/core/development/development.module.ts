import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DevelopmentRoutingModule } from "./development.routing-module";
import { DevelopmentViewComponent } from './components/development-view/development-view.component';

@NgModule({
  declarations: [
    DevelopmentViewComponent
  ],
  imports: [
    SharedModule,
    DevelopmentRoutingModule,
  ],
  providers: []
})
export class DevelopmentModule { }