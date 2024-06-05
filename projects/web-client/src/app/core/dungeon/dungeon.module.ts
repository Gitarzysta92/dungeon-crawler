import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DungeonRoutingModule } from './dungeon.routing-module';
import { DungeonViewComponent } from './components/dungeon-view/dungeon-view.component';
import { GameLogicSharedModule } from '../game-logic/game-logic.shared-module';
import { SceneSharedModule } from '../scene/scene.shared-module';
import { GameUiSharedModule } from '../game-ui/game-ui.shared-module';
import { DungeonResolver } from './resolvers/dungeon.resolver';
import { MenusSharedModule } from '../menus/menus.shared-module';
import { ApiTurnService } from './services/api-turn.service';
import { GuiTurnService } from './services/gui-turn.service';
import { DungeonDevSharedModule } from '../../development/dungeon-dev/dungeon-dev.shared-module';
import { DungeonSummaryViewComponent } from './components/dungeon-summary-view/dungeon-summary-view.component';
import { AdventureSharedModule } from '../adventure/adventure.shared-module';
import { DungeonSharedModule } from './dungeon.shared-module';

@NgModule({
  declarations: [
    DungeonViewComponent,
    DungeonSummaryViewComponent
  ],
  imports: [
    SharedModule,
    DungeonSharedModule,
    DungeonRoutingModule,
    GameLogicSharedModule,
    SceneSharedModule,
    GameUiSharedModule,
    MenusSharedModule,
    DungeonDevSharedModule,
    AdventureSharedModule
  ],
  providers: [
    DungeonResolver,
    GuiTurnService,
    ApiTurnService,
  ]
})
export class DungeonModule { }