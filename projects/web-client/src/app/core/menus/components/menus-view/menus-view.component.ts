import { ISceneInitialData } from '@3d-scene/app/scene-app.interface';
import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SoundEffectsService } from 'src/app/aspects/sound-effects/api';
import { dungeonTemplate } from 'src/app/core/game-data/constants/data-feed-dungeons';
import { actors, fields } from 'src/app/core/dungeon-dev/components/dungeon-scene-dev/dungeon-scene-dev2.constants';
import { mapFieldToSceneField, mapBoardObjectToSceneToken } from 'src/app/core/dungeon-dev/mappings/dungeon-scene-mappings';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { SettingsStore } from 'src/app/core/settings/stores/settings.store';
import { BACKGROUND_SOUND_THEME } from '../../constants/menu-sound-tracks';

@Component({
  selector: 'app-menus-view',
  templateUrl: './menus-view.component.html',
  styleUrls: ['./menus-view.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
          })
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 })
        ], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            animate('300ms 300ms ease-out', style({ opacity: 1 }))
          ], { optional: true }),
          query('@*', animateChild(), { optional: true })
        ]),
      ])
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ transform: "translate(0, 200px)" }),
        animate('0.2s ease-out', style({ transform: "translate(0, 0)" }))
      ]),
      transition(':leave', [
        style({ transform: "translate(0, 0)" }),
        animate('0.2s ease-out', style({ transform: "translate(0, 200px)" }))
      ])
    ])
  ]
})
export class MenusViewComponent implements AfterViewInit, OnInit, OnDestroy {

  public showFooter = true;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _soundService: SoundEffectsService,
    private readonly _settingsStore: SettingsStore
  ) { }
  
  ngOnInit(): void {
    this._soundService.play(BACKGROUND_SOUND_THEME, this._settingsStore.currentState.sound.musicVolume, this._settingsStore.currentState.sound.isMuted, true)
  }

  ngAfterViewInit(): void {
    this._initializeScene();
  }

  ngOnDestroy(): void {
    this._soundService.stop(BACKGROUND_SOUND_THEME);
  }

  prepareRoute(outlet: RouterOutlet) {
    this.showFooter = outlet.activatedRouteData.showFooter ?? true;
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }


  private _initializeScene(): void {
    let composerDefinitions = this.getY();
    composerDefinitions = [...dungeonTemplate.visual.scene.composerDefinitions,...composerDefinitions] as any

    const initialData: ISceneInitialData = {
      bgColor: dungeonTemplate.visual.scene.bgColor,
      composerDefinitions: composerDefinitions
    };

    this._sceneService.initializeScene(initialData);
  }

  private getY() {
    const fieldDefinitions = fields.map(fcd => mapFieldToSceneField(Object.assign({ id: "" }, fcd)))
    const tokenDefinitions = actors.map(tcd => mapBoardObjectToSceneToken({...tcd} as any));
    return [...fieldDefinitions, ...tokenDefinitions]
  }


  public openLink(url: string): void {
    //this._externalLinkService.openExternalLink(url);
  }

}
