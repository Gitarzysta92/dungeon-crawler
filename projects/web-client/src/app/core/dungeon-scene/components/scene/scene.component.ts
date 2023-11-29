import { TileObject } from '@3d-scene/lib/actors/game-objects/tile.game-object';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { Observable } from 'rxjs';
import { IDungeonSceneState } from '../../interfaces/dungeon-scene-state';
import { SceneService } from '../../services/scene.service';
import { DataFeedService } from 'src/app/core/data-feed/services/data-feed.service';


@Component({
  selector: 'scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef | undefined;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _dataFeedService: DataFeedService
  ) { 
    this._changeDetectorRef.detach();
  }

  ngOnInit(): void {}

  @HostListener('window:resize')
  onResize() {
    this._sceneService.adjustRendererSize();
  }
}



// private _updatesQueue: (() => Promise<void>)[] = [];
// private _processingUpdate: boolean = false;


// private _enqueueSceneUpdate(s: IDungeonSceneState): void {
//   this._updatesQueue.push(async () => {
//     await this._updateBoardFields(s);
//     await this._updateBoardActors(s);
//   });
//   if (!this._processingUpdate) {
//     this._processSceneUpdate();
//   }
// }


// private async _processSceneUpdate(): Promise<void> {
//   this._processingUpdate = true;
//   while (this._updatesQueue.length > 0) {
//     await this._updatesQueue.shift()();
//   }
//   this._processingUpdate = false;

//   if (this._updatesQueue.length === 0) {
//     this._sceneService.sceneUpdated$.next()
//   }
// }
