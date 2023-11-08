import { NgModule } from "@angular/core";
import { NavigationModule } from "src/app/aspects/navigation/navigation.module";
import { SoundEffectsModule } from "src/app/aspects/sound-effects/sound-effects.module";
import { ViewTemplatesModule } from "src/app/infrastructure/view-templates/view-templates.module";
import { MyProfileSharedModule } from "../my-profile/my-profile.shared-module";
import { GameCreatorRoutinModule } from "./game-progression.routing-module";
import { GameCreatorComponent } from './components/game-creator/game-creator.component';
import { GameLoaderComponent } from './components/game-loader/game-loader.component';

@NgModule({
  declarations: [
    GameCreatorComponent,
    GameLoaderComponent
  ],
  imports: [
    ViewTemplatesModule,
    NavigationModule,
    MyProfileSharedModule,
    SoundEffectsModule,
    GameCreatorRoutinModule
  ]
})
export class GameCreatorModule { }