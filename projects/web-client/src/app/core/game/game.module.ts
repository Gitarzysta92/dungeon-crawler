import { NgModule } from "@angular/core";
import { NavigationModule } from "src/app/aspects/navigation/navigation.module";
import { SoundEffectsModule } from "src/app/aspects/sound-effects/sound-effects.module";
import { ViewTemplatesModule } from "src/app/infrastructure/view-templates/view-templates.module";
import { CommonsSharedModule } from "../commons/commons.shared-module";
import { GameViewComponent } from './components/game-view/game-view.component';
import { RouterModule } from '@angular/router';
import { GameRoutingModule } from "./game.routing-module";
import { GameResolver } from "./resolvers/game.resolver";
import { AdventureSharedModule } from "../adventure/adventure.shared-module";
import { DungeonSharedModule } from "../dungeon/dungeon.shared-module";
import { GameLoadingScreenComponent } from './components/game-loading-screen/game-loading-screen.component';
import { SharedModule } from "src/app/shared/shared.module";
import { AssetsLoaderModule } from "src/app/infrastructure/asset-loader/asset-loader.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    GameViewComponent,
    GameLoadingScreenComponent,
  ],
  imports: [
    RouterModule,
    CommonsSharedModule,
    SharedModule,
    ViewTemplatesModule,
    NavigationModule,
    SoundEffectsModule,
    GameRoutingModule,
    DungeonSharedModule,
    AssetsLoaderModule,
    TranslateModule.forChild({ extend: true })
  ],
  providers: [
    GameResolver
  ]
})
export class GameModule { }