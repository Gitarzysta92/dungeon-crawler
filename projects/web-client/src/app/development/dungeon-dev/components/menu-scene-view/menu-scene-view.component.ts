import { Component, OnInit } from '@angular/core';
import { dungeonDeclaration } from 'src/app/core/game-data/constants/data-feed-dungeons';
import { MenuSceneService } from 'src/app/core/scene/services/menu-scene.service';
import { actors, fields } from '../dungeon-scene-dev/dungeon-scene-dev2.constants';
import { mapFieldToSceneField, mapBoardObjectToSceneToken } from '../../mappings/dungeon-scene-mappings';

@Component({
  selector: 'menu-scene-view',
  templateUrl: './menu-scene-view.component.html',
  styleUrls: ['./menu-scene-view.component.scss'],
  providers: [
    MenuSceneService,
  ]
})
export class MenuSceneViewComponent implements OnInit {

  constructor(
    public readonly sceneService: MenuSceneService
  ) { }

  ngOnInit(): void {
    const fieldDefinitions = fields.map(fcd => mapFieldToSceneField(Object.assign({ id: "" }, fcd)))
    const tokenDefinitions = actors.map(tcd => mapBoardObjectToSceneToken({...tcd} as any));
    const composerDeclarations = [
      ...dungeonDeclaration.scene.composerDeclarations,
      ...fieldDefinitions,
      ...tokenDefinitions
    ];
    this.sceneService.composeScene(composerDeclarations)
  }


  public animateCamera() {
    this.sceneService.sceneApp.animateCamera();
  }

}
