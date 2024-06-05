import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GameUiDev } from "./game-ui-dev.routing";
import { HeroBarDevComponent } from "./components/hero-bar-dev/hero-bar-dev.component";


@NgModule({
  imports: [
    RouterModule.forChild(GameUiDev.routes.bindComponents({
      heroBar: HeroBarDevComponent,
    }).toDefaultFormat())
  ],
  exports: [RouterModule]
})
export class GameUiDevRoutingModule { }