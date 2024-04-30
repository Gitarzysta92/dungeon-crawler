import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DevelopmentRoutingModule } from "./development.routing-module";
import { DevelopmentViewComponent } from './components/development-view/development-view.component';
import { DungeonDevModule } from "../dungeon-dev/dungeon-dev.module";

@NgModule({
  declarations: [
    DevelopmentViewComponent
  ],
  imports: [
    SharedModule,
    DevelopmentRoutingModule,
    DungeonDevModule
  ],
  providers: []
})
export class DevelopmentModule { }