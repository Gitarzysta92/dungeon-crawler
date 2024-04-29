import { NgModule } from "@angular/core";
import { NavigationModule } from "src/app/aspects/navigation/navigation.module";
import { SoundEffectsModule } from "src/app/aspects/sound-effects/sound-effects.module";
import { ViewTemplatesModule } from "src/app/infrastructure/view-templates/view-templates.module";
import { CommonsSharedModule } from "../commons/commons.shared-module";
import { GameViewComponent } from './components/game-view/game-view.component';
import { RouterModule } from '@angular/router';
import { GameRoutingModule } from "./game.routing-module";
import { GameResolver } from "./resolvers/game.resolver";

@NgModule({
  declarations: [
    GameViewComponent,
  ],
  imports: [
    RouterModule,
    CommonsSharedModule,
    ViewTemplatesModule,
    NavigationModule,
    SoundEffectsModule,
    GameRoutingModule,
  ],
  providers: [
    GameResolver
  ]
})
export class GameModule { }