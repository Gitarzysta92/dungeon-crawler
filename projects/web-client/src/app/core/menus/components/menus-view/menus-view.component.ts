import { ISceneInitialData } from '@3d-scene/app/scene-app.interface';
import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { dungeonTemplate } from 'src/app/core/data/constants/data-feed-dungeons';
import { actors, fields } from 'src/app/core/dungeon-dev/components/dungeon-scene-dev/dungeon-scene-dev2.constants';
import { mapFieldToSceneField, mapBoardObjectToSceneToken } from 'src/app/core/dungeon-dev/mappings/dungeon-scene-mappings';
import { SceneService } from 'src/app/core/scene/services/scene.service';

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
            height: '100vh',
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
        style({ opacity: 0 }),  // Start with an invisible state
        animate('0.3s', style({ opacity: 1 }))  // Animate to an opaque state
      ]),
      transition(':leave', [
        style({ opacity: 1 }),  // Start with an opaque state
        animate('0.3s', style({ opacity: 0 }))  // Animate to an invisible state
      ])
    ])
  ]
})
export class MenusViewComponent implements OnInit {

  public socials: { iconName: string, link: string }[] = [
    { iconName: "kickstarter", link: "" }
  ]

  constructor(
    private readonly _sceneService: SceneService,
  ) { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  ngAfterViewInit(): void {
    this._initializeScene();
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
