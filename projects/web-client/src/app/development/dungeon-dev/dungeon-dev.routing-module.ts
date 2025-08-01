import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DungeonDev } from "./dungeon-dev.routing";
import { DungeonSceneDevComponent } from "./components/dungeon-scene-dev/dungeon-scene-dev.component";
import { MenuSceneViewComponent } from "./components/menu-scene-view/menu-scene-view.component";
import { AdventurePlaygroundViewComponent } from "./components/adventure-playground-view/adventure-playground-view.component";
import { FireExplosionDemoComponent } from "./components/fire-explosion-demo/fire-explosion-demo.component";


@NgModule({
  imports: [
    RouterModule.forChild(DungeonDev.routes.bindComponents({
      playground: DungeonSceneDevComponent,
      menuScene: MenuSceneViewComponent,
      adventureScene: AdventurePlaygroundViewComponent,
      fireExplosionDemo: FireExplosionDemoComponent
      // tileRotationDev: TileRotationDevViewComponent,
      // boardSelectorDev: BoardSelectorDevViewComponent,
      // sceneDev: DungeonSceneDevComponent
    }).toDefaultFormat())
  ],
  exports: [RouterModule]
})
export class DungeonDevRoutingModule { }