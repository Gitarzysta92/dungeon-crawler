import { NgModule } from "@angular/core";
import { NavigationModule } from "src/app/aspects/navigation/navigation.module";
import { SoundEffectsModule } from "src/app/aspects/sound-effects/sound-effects.module";
import { ViewTemplatesModule } from "src/app/infrastructure/view-templates/view-templates.module";
import { MyProfileSharedModule } from "../my-profile/my-profile.shared-module";
import { AdventureRoutingModule } from "./adventure.routing-module";
import { AdventureViewComponent } from "./components/adventure-view/adventure-view.component";
import { HallViewComponent } from './components/hall-view/hall-view.component';
import { CharacterViewComponent } from './components/character-view/character-view.component';
import { MenusSharedModule } from "../menus/menus.shared-module";
import { DungeonAreaViewComponent } from './components/dungeon-area-view/dungeon-area-view.component';
import { BuildingAreaViewComponent } from './components/building-area-view/building-area-view.component';
import { AdventureSharedModule } from "./adventure.shared-module";

@NgModule({
  declarations: [
    AdventureViewComponent,
    HallViewComponent,
    CharacterViewComponent,
    DungeonAreaViewComponent,
    BuildingAreaViewComponent
  ],
  imports: [
    ViewTemplatesModule,
    NavigationModule,
    MyProfileSharedModule,
    SoundEffectsModule,
    AdventureRoutingModule,
    MenusSharedModule,
    AdventureSharedModule
  ]
})
export class AdventureModule {}