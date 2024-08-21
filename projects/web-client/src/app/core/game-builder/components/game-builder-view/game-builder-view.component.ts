import { Component, Injector, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';
import { GameBuilderService } from '../../services/game-builder.service';
import { GamePersistenceService } from 'src/app/core/game-persistence/services/game-persistence.service';
import { GameSaveProvider } from 'src/app/core/adventure/misc/game-save-provider';
import { trigger, transition, style, animate } from '@angular/animations';
import { DataFeedService } from 'src/app/core/game-data/services/data-feed.service';
import { IPickerDeclaration } from 'src/app/core/game-data/constants/hero-picker.data';
import { ModalService } from 'src/app/core/game-ui/services/modal.service';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { IUiMedium } from 'src/app/core/game-ui/mixins/ui-medium/ui-medium.interface';
import { FlexibleConnectedPositionStrategyOrigin, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { InfoPanelComponent } from 'src/app/core/game-ui/components/info-panel/info-panel.component';

@Component({
  selector: 'game-builder',
  templateUrl: './game-builder-view.component.html',
  styleUrls: ['./game-builder-view.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ transform: "translate(-200px, 0)" }),
        animate('0.2s ease-out', style({ transform: "translate(0, 0)" }))
      ])
    ])
  ]
})
export class GameBuilderViewComponent implements OnInit {

  public selectedHero: IPickerDeclaration
  public heroes: IPickerDeclaration[];
  private _overlayRef: OverlayRef;

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _gameBuilderStateStore: GameBuilderStateStore,
    private readonly _gameBuilderService: GameBuilderService,
    private readonly _dataFeed: DataFeedService,
    private readonly _gamePersistanceService: GamePersistenceService,
    private readonly _infoPanelService: ModalService,
    private readonly _injectorRef: Injector,
    private readonly _positionBuilder: OverlayPositionBuilder,
  ) { }

  async ngOnInit(): Promise<void> {
    this.heroes = await this._dataFeed.getHeroPicker()
  }

  public selectHero(hero: IPickerDeclaration): void {
    this.selectedHero = hero;
  }

  public async createGame(): Promise<void> {
    if (!this.selectedHero) {
      return;
    }
    const game = await this._gameBuilderService.createGame(this.selectedHero);
    await this._gamePersistanceService.createGameSave(new GameSaveProvider(game), [game], null, true);
    this._routingService.navigateToGame()
  }

  public returnToMenu() {
    this._routingService.navigateToMainMenu();
  }

  public openInfoPanel(
    e: MouseEvent,
    origin: FlexibleConnectedPositionStrategyOrigin & any,
    d: INarrativeMedium & IUiMedium): void {
   
    if (e.type === 'mouseenter') {
      const position = this._positionBuilder.flexibleConnectedTo(origin)
        .withPositions([
          { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
        ]);
      this._overlayRef = this._infoPanelService.createInfoPanelV2(InfoPanelComponent, d, this._injectorRef, null, position)
    } else {
      this._overlayRef?.dispose();
    }
  }

  public navigateToHeroDetails(hero: IPickerDeclaration) {
    
  }
}