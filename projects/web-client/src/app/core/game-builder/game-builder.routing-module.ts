import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GameBuilder } from "./game-builder.routing";
import { GameBuilderViewComponent } from "./components/game-builder-view/game-builder-view.component";


GameBuilder.routes.bindComponents({
  builder: GameBuilderViewComponent,
});

@NgModule({
  imports: [RouterModule.forChild(GameBuilder.routes.toDefaultFormat())],
  exports: [RouterModule]
})
export class GameBuilderRoutingModule { }