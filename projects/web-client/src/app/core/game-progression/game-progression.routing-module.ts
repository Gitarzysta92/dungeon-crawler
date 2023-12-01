import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GameCreatorComponent } from "./components/game-creator/game-creator.component";
import { GameCreator } from "./game-progression.routing";
import { GameLoaderComponent } from "./components/game-loader/game-loader.component";


GameCreator.routes.bindComponents({
  creator: GameCreatorComponent,
  loader: GameLoaderComponent
});

@NgModule({
  imports: [RouterModule.forChild(GameCreator.routes.toDefaultFormat())],
  exports: [RouterModule]
})
export class GameCreatorRoutinModule { }