import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GameViewComponent } from "./components/game-view/game-view.component";
import { Game } from "./game.routing";
import { HeroViewComponent } from "./components/hero-view/hero-view.component";
import { JournalViewComponent } from "./components/journal-view/journal-view.component";
@NgModule({
  imports: [RouterModule.forChild(Game.routes.bindComponents({
    game: GameViewComponent,
    hero: HeroViewComponent,
    journal: JournalViewComponent
  }).toDefaultFormat())],
  exports: [RouterModule]
})
export class GameRoutingModule { }
