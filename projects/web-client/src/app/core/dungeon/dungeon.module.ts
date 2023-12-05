import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DungeonRoutingModule } from './dungeon.routing-module';
import { DungeonViewComponent } from './components/dungeon-view/dungeon-view.component';
import { DungeonLogicSharedModule } from '../dungeon-logic/dungeon-logic.shared-module';
import { DungeonSceneSharedModule } from '../dungeon-scene/dungeon-scene.shared-module';
import { DungeonUiSharedModule } from '../dungeon-ui/dungeon-ui.shared-module';
import { DungeonResolver } from './resolvers/dungeon.resolver';
import { DungeonInteractionStore } from './stores/dungeon-interaction.store';
import { MenusSharedModule } from '../menus/menus.shared-module';
import { DungeonTurnControllerService } from './services/dungeon-turn-controller/dungeon-turn-controller.service';
import { PlayerTurnControllerService } from './services/player-turn-controller/player-turn-controller.service';
import { DungeonDevSharedModule } from '../dungeon-dev/dungeon-dev.shared-module';

@NgModule({
  declarations: [
    DungeonViewComponent
  ],
  imports: [
    SharedModule,
    DungeonRoutingModule,
    DungeonLogicSharedModule,
    DungeonSceneSharedModule,
    DungeonUiSharedModule,
    MenusSharedModule,
    DungeonDevSharedModule
  ],
  providers: [
    DungeonResolver,
    DungeonInteractionStore,
    PlayerTurnControllerService,
    DungeonTurnControllerService,
  ]
})
export class DungeonModule { }