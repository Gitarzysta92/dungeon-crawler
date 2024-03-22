import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GamePersistence } from "./game-persistence.routing";
import { GameLoaderComponent } from "./components/game-loader/game-loader.component";


GamePersistence.routes.bindComponents({
  loader: GameLoaderComponent
});

@NgModule({
  imports: [RouterModule.forChild(GamePersistence.routes.toDefaultFormat())],
  exports: [RouterModule]
})
export class GamePersistenceRoutingModule { }