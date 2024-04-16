import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DungeonRoutingModule } from './dungeon.routing-module';
import { DungeonViewComponent } from './components/dungeon-view/dungeon-view.component';
import { GameLogicSharedModule } from '../game-logic/game-logic.shared-module';
import { DungeonSceneSharedModule } from '../dungeon-scene/dungeon-scene.shared-module';
import { GameUiSharedModule } from '../game-ui/game-ui.shared-module';
import { DungeonResolver } from './resolvers/dungeon.resolver';
import { MenusSharedModule } from '../menus/menus.shared-module';
import { DungeonTurnControllerService } from './services/dungeon-turn-controller.service';
import { PlayerTurnControllerService } from './services/player-controller.service';
import { DungeonDevSharedModule } from '../dungeon-dev/dungeon-dev.shared-module';
import { DungeonSummaryViewComponent } from './components/dungeon-summary-view/dungeon-summary-view.component';
import { AdventureSharedModule } from '../adventure/adventure.shared-module';

@NgModule({
  declarations: [
    DungeonViewComponent,
    DungeonSummaryViewComponent
  ],
  imports: [
    SharedModule,
    DungeonRoutingModule,
    GameLogicSharedModule,
    DungeonSceneSharedModule,
    GameUiSharedModule,
    MenusSharedModule,
    DungeonDevSharedModule,
    AdventureSharedModule
  ],
  providers: [
    DungeonResolver,
    PlayerTurnControllerService,
    DungeonTurnControllerService,
  ]
})
export class DungeonModule { }