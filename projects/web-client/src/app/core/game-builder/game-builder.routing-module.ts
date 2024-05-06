import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GameBuilder } from "./game-builder.routing";
import { GameBuilderViewComponent } from "./components/game-builder-view/game-builder-view.component";
import { RacePickerComponent } from "./components/race-picker/race-picker.component";
import { ClassPickerComponent } from "./components/class-picker/class-picker.component";
import { OriginPickerComponent } from "./components/origin-picker/origin-picker.component";
import { IdentityPickerComponent } from "./components/identity-picker/identity-picker.component";


GameBuilder.routes.bindComponents({
  builder: {
    _: GameBuilderViewComponent,
    race: RacePickerComponent,
    class: ClassPickerComponent,
    origin: OriginPickerComponent,
    identity: IdentityPickerComponent,
  }
});

@NgModule({
  imports: [RouterModule.forChild(GameBuilder.routes.toDefaultFormat())],
  exports: [RouterModule]
})
export class GameBuilderRoutingModule { }