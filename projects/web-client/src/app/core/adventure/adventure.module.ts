import { NgModule } from "@angular/core";
import { NavigationModule } from "src/app/aspects/navigation/navigation.module";
import { SoundEffectsModule } from "src/app/aspects/sound-effects/sound-effects.module";
import { ViewTemplatesModule } from "src/app/infrastructure/view-templates/view-templates.module";
import { AdventureRoutingModule } from "./adventure.routing-module";
import { AdventureViewComponent } from "./components/adventure-view/adventure-view.component";
import { HallViewComponent } from './components/hall-view/hall-view.component';
import { CharacterViewComponent } from './components/character-view/character-view.component';
import { MenusSharedModule } from "../menus/menus.shared-module";
import { DungeonAreaViewComponent } from './components/dungeon-area-view/dungeon-area-view.component';
import { BuildingAreaViewComponent } from './components/building-area-view/building-area-view.component';
import { AdventureSharedModule } from "./adventure.shared-module";
import { SharedModule } from "src/app/shared/shared.module";
import { AdventureGameplayFactory } from "./gameplay/adventure-gameplay.factory";
import { AdventureResolver } from "./resolvers/adventure.resolver";
import { AssetsLoaderModule } from "src/app/infrastructure/asset-loader/asset-loader.module";
import { SceneSharedModule } from "../scene/scene.shared-module";
import { AreaLabelComponent } from './components/area-label/area-label.component';
import { GameSharedModule } from "../game/game.shared-module";
import { SceneService } from "../scene/services/scene.service";
import { AreaViewComponent } from './components/area-view/area-view.component';
import { GameUiSharedModule } from "../game-ui/game-ui.shared-module";
import { DungeonViewComponent } from './components/dungeon-view/dungeon-view.component';
import { SceneInteractionService } from "../scene/api";
import { AdventureSceneComponent } from './components/adventure-scene/adventure-scene.component';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    AdventureViewComponent,
    HallViewComponent,
    CharacterViewComponent,
    DungeonAreaViewComponent,
    BuildingAreaViewComponent,
    AreaLabelComponent,
    AreaViewComponent,
    DungeonViewComponent,
    AdventureSceneComponent,
  ],
  imports: [
    SharedModule,
    GameSharedModule,
    GameUiSharedModule,
    AdventureSharedModule,
    AdventureRoutingModule,
    ViewTemplatesModule,
    NavigationModule,
    SoundEffectsModule,
    MenusSharedModule,
    AssetsLoaderModule,
    SceneSharedModule,
    TranslateModule.forChild({ extend: true }),
  ],
  providers: [
    AdventureGameplayFactory,
    AdventureResolver,
    SceneService,
    SceneInteractionService
  ]
})
export class AdventureModule {}