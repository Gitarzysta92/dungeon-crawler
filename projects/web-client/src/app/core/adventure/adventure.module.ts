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
import { AdventureGameplayStateFactoryService } from "./services/adventure-gameplay-state-factory.service";
import { AdventureResolver } from "./resolvers/adventure.resolver";
import { AssetsLoaderModule } from "src/app/infrastructure/asset-loader/asset-loader.module";
import { SceneSharedModule } from "../scene/scene.shared-module";
import { AreaLabelComponent } from './components/area-label/area-label.component';

@NgModule({
  declarations: [
    AdventureViewComponent,
    HallViewComponent,
    CharacterViewComponent,
    DungeonAreaViewComponent,
    BuildingAreaViewComponent,
    AreaLabelComponent
  ],
  imports: [
    SharedModule,
    AdventureSharedModule,
    ViewTemplatesModule,
    NavigationModule,
    SoundEffectsModule,
    AdventureRoutingModule,
    MenusSharedModule,
    AdventureSharedModule,
    AssetsLoaderModule,
    SceneSharedModule
  ],
  providers: [
    AdventureGameplayStateFactoryService,
    AdventureResolver
  ]
})
export class AdventureModule {}