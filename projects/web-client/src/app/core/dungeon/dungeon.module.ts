import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DungeonRoutingModule } from './dungeon.routing-module';
import { DungeonViewComponent } from './components/dungeon-view/dungeon-view.component';
import { SceneSharedModule } from '../scene/scene.shared-module';
import { GameUiSharedModule } from '../game-ui/game-ui.shared-module';
import { DungeonResolver } from './resolvers/dungeon.resolver';
import { MenusSharedModule } from '../menus/menus.shared-module';
import { ComputerPlayerService } from './services/computer-player.service';
import { DungeonDevSharedModule } from '../../development/dungeon-dev/dungeon-dev.shared-module';
import { DungeonSummaryViewComponent } from './components/dungeon-summary-view/dungeon-summary-view.component';
import { AdventureSharedModule } from '../adventure/adventure.shared-module';
import { DungeonSharedModule } from './dungeon.shared-module';
import { GameBuilderSharedModule } from '../game-builder/game-builder.shared-module';
import { CardsOutletComponent } from './components/cards-outlet/cards-outlet.component';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { CardsDeckComponent } from './components/cards-deck/cards-deck.component';
import { TurnControlsComponent } from './components/turn-controls/turn-controls.component';
import { AbilityControlsComponent } from './components/ability-controls/ability-controls.component';
import { TranslateModule } from '@ngx-translate/core';
import { ResourcesBarComponent } from './components/resources-bar/resources-bar.component';
import { CardsBoardComponent } from './components/cards-board/cards-board.component';
import { DungeonGameplayBuilder } from './gameplay/dungeon-gameplay.builder';
import { TurnIntermissionComponent } from './components/turn-intermission/turn-intermission.component';
import { CreatureBarComponent } from './components/creature-bar/creature-bar.component';
import { DungeonSceneComponent } from './components/dungeon-scene/dungeon-scene.component';
import { StatisticChangeIndicatorComponent } from './components/statistic-change-indicator/statistic-change-indicator.component';
import { AssetsLoaderModule } from 'src/app/infrastructure/asset-loader/asset-loader.module';
import { OpponentPlayedCardAcknowledgementComponent } from './components/opponent-played-card-acknowledgement/opponent-played-card-acknowledgement.component';

@NgModule({
  declarations: [
    DungeonViewComponent,
    DungeonSummaryViewComponent,
    CardsOutletComponent,
    CardContainerComponent,
    CardsDeckComponent,
    TurnControlsComponent,
    AbilityControlsComponent,
    ResourcesBarComponent,
    CardsBoardComponent,
    TurnIntermissionComponent,
    CreatureBarComponent,
    DungeonSceneComponent,
    StatisticChangeIndicatorComponent,
    OpponentPlayedCardAcknowledgementComponent,
  ],
  imports: [
    SharedModule,
    DungeonSharedModule,
    DungeonRoutingModule,
    SceneSharedModule,
    GameUiSharedModule,
    MenusSharedModule,
    DungeonDevSharedModule,
    AdventureSharedModule,
    GameBuilderSharedModule,
    TranslateModule.forChild({ extend: true }),
    AssetsLoaderModule
  ],
  providers: [
    DungeonResolver,
    DungeonGameplayBuilder,
    ComputerPlayerService,
  ]
})
export class DungeonModule { }