import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DungeonRoutingModule } from './dungeon.routing-module';
import { DungeonViewComponent } from './components/dungeon-view/dungeon-view.component';
import { GameplayLogicSharedModule } from '../dungeon-logic/gameplay-logic.shared-module';
import { GameplaySceneSharedModule } from '../dungeon-scene/gameplay-scene.shared-module';
import { GameplayUiSharedModule } from '../dungeon-ui/gameplay-ui.shared-module';
import { DungeonResolver } from './resolvers/dungeon.resolver';
import { DungeonInteractionStore } from './stores/dungeon-interaction.store';
import { MenusSharedModule } from '../menus/menus.shared-module';
import { DungeonArtificialIntelligenceService } from '../dungeon-logic/services/dungeon-artificial-intelligence/dungeon-artificial-intelligence.service';
import { DungeonTurnControllerService } from './services/dungeon-turn-controller/dungeon-turn-controller.service';
import { EffectPayloadProviderService } from './services/effect-payload-provider/effect-payload-provider.service';
import { PlayerTurnControllerService } from './services/player-turn-controller/player-turn-controller.service';

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
    DungeonInteractionStore,
    PlayerTurnControllerService,
    DungeonTurnControllerService,
    EffectPayloadProviderService,
    DungeonArtificialIntelligenceService
  ]
})
export class DungeonModule { }