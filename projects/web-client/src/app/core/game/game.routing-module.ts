import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GameViewComponent } from "./components/game-view/game-view.component";
import { Game } from "./game.routing";
@NgModule({
  imports: [RouterModule.forChild(Game.routes.bindComponents({
    game: GameViewComponent
  }).toDefaultFormat())],
  exports: [RouterModule]
})
export class GameRoutingModule { }
