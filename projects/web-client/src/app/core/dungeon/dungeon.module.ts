import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { InteractionControllerService } from './services/interaction-controller/interaction-controller.service';
import { DungeonRoutingModule } from './dungeon.routing-module';
import { GameplayViewComponent } from './components/gameplay-view/gameplay-view.component';
import { GameplayLogicSharedModule } from '../dungeon-logic/gameplay-logic.shared-module';
import { GameplaySceneSharedModule } from '../dungeon-scene/gameplay-scene.shared-module';
import { GameplayUiSharedModule } from '../dungeon-ui/gameplay-ui.shared-module';

@NgModule({
  declarations: [
    GameplayViewComponent
  ],
  imports: [
    SharedModule,
    DungeonRoutingModule,
    GameplayLogicSharedModule,
    GameplaySceneSharedModule,
    GameplayUiSharedModule
  ],
  providers: [
    InteractionControllerService,
  ]
})
export class DungeonModule { }