import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DungeonRoutingModule } from './dungeon.routing-module';
import { DungeonViewComponent } from './components/dungeon-view/dungeon-view.component';
import { GameplayLogicSharedModule } from '../dungeon-logic/gameplay-logic.shared-module';
import { GameplaySceneSharedModule } from '../dungeon-scene/gameplay-scene.shared-module';
import { GameplayUiSharedModule } from '../dungeon-ui/gameplay-ui.shared-module';
import { DungeonResolver } from './resolvers/dungeon.resolver';
import { DungeonStateStore } from '../dungeon-logic/stores/dungeon-state.store';
import { DungeonSceneStore } from '../dungeon-scene/stores/dungeon-scene.store';
import { DungeonActivityLogStore } from '../dungeon-ui/stores/dungeon-activity-log.store';
import { DungeonUiStore } from '../dungeon-ui/stores/dungeon-ui.store';
import { DungeonInteractionStore } from './stores/dungeon-interaction.store';
import { MenusSharedModule } from '../menus/menus.shared-module';

@NgModule({
  declarations: [
    DungeonViewComponent
  ],
  imports: [
    SharedModule,
    DungeonRoutingModule,
    GameplayLogicSharedModule,
    GameplaySceneSharedModule,
    GameplayUiSharedModule,
    MenusSharedModule
  ],
  providers: [
    DungeonResolver,
    DungeonActivityLogStore,
    DungeonStateStore,
    DungeonSceneStore,
    DungeonUiStore,
    DungeonInteractionStore,
  ]
})
export class DungeonModule { }