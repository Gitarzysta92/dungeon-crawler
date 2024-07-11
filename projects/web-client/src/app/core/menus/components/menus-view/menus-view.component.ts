import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SoundEffectsService } from 'src/app/aspects/sound-effects/api';
import { SettingsStore } from 'src/app/core/settings/stores/settings.store';
import { BACKGROUND_SOUND_THEME } from '../../constants/menu-sound-tracks';
import { MenuSceneService } from 'src/app/core/scene/services/menu-scene.service';

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
export class MenusViewComponent implements OnInit, OnDestroy {

  public showFooter = true;

  constructor(
    public readonly sceneService: MenuSceneService,
    private readonly _soundService: SoundEffectsService,
    private readonly _settingsStore: SettingsStore,
  ) { }
  
  ngOnInit(): void {
    this._soundService.play(BACKGROUND_SOUND_THEME, this._settingsStore.currentState.sound.musicVolume, this._settingsStore.currentState.sound.isMuted, true);
  }

  ngOnDestroy(): void {
    console.log('menus-view destroyed')
    this._soundService.stop(BACKGROUND_SOUND_THEME);
    this.sceneService.dispose();
  }

  activated() {
    this.sceneService?.sceneApp?.animateCamera();
  }

  prepareRoute(outlet: RouterOutlet) {
    this.showFooter = outlet.activatedRouteData.showFooter ?? true;
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  public openLink(url: string): void {
    //this._externalLinkService.openExternalLink(url);
  }

}
