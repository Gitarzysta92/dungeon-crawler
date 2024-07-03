import { NgModule } from "@angular/core";
import { NavigationModule } from "src/app/aspects/navigation/navigation.module";
import { SoundEffectsModule } from "src/app/aspects/sound-effects/sound-effects.module";
import { ViewTemplatesModule } from "src/app/infrastructure/view-templates/view-templates.module";
import { CommonsSharedModule } from "../commons/commons.shared-module";
import { GameViewComponent } from './components/game-view/game-view.component';
import { RouterModule } from '@angular/router';
import { GameRoutingModule } from "./game.routing-module";
import { GameResolver } from "./resolvers/game.resolver";
import { DungeonSharedModule } from "../dungeon/dungeon.shared-module";
import { GameLoadingScreenComponent } from './components/game-loading-screen/game-loading-screen.component';
import { SharedModule } from "src/app/shared/shared.module";
import { AssetsLoaderModule } from "src/app/infrastructure/asset-loader/asset-loader.module";
import { TranslateModule } from "@ngx-translate/core";
import { EditorSharedModule } from "../editor/editor.shared-module";
import { HeroViewComponent } from './components/hero-view/hero-view.component';
import { JournalViewComponent } from './components/journal-view/journal-view.component';
import { GameUiSharedModule } from "../game-ui/game-ui.shared-module";
import { GameMenuViewComponent } from './components/game-menu-view/game-menu-view.component';

@NgModule({
  declarations: [
    GameViewComponent,
    GameLoadingScreenComponent,
    HeroViewComponent,
    JournalViewComponent,
    GameMenuViewComponent,
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
    TranslateModule.forChild({ extend: true }),
    EditorSharedModule,
    GameUiSharedModule
  ],
  providers: [
    GameResolver
  ]
})
export class GameModule { }