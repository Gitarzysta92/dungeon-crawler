import { TileObject } from '@3d-scene/lib/actors/game-objects/tile.game-object';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { Observable } from 'rxjs';
import { IDungeonSceneState } from '../../interfaces/dungeon-scene-state';
import { SceneInitializationService } from '../../services/scene-initialization/scene-initialization.service';
import { ROTATION_ANGLES } from '@3d-scene/lib/constants/tile-rotation-radians';

@Component({
  selector: 'scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef | undefined;
  @Input() state$: Observable<IDungeonSceneState>

  private _updatesQueue: (() => Promise<void>)[] = [];
  private _processingUpdate: boolean = false;

  constructor(
    private readonly _sceneService: SceneInitializationService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) { 
    this._changeDetectorRef.detach();
  }

  ngOnInit(): void {
    this.state$.subscribe(s => this._enqueueSceneUpdate(s));
  }

  @HostListener('window:resize')
  onResize() {
    this._sceneService.adjustRendererSize();
  }

  private _enqueueSceneUpdate(s: IDungeonSceneState): void {
    this._updatesQueue.push(async () => {
      await this._updateBoardFields(s);
      await this._updateBoardActors(s);
    });
    if (!this._processingUpdate) {
      this._processSceneUpdate();
    }
  }

  
  private async _processSceneUpdate(): Promise<void> {
    this._processingUpdate = true;
    while (this._updatesQueue.length > 0) {
      await this._updatesQueue.shift()();
    }
    this._processingUpdate = false;
  }


  private async _createTile(id: string, tile: any): Promise<TileObject> {
    const tileDeclaration = Object.assign(tile.visualData, {
      auxId: id,
      type: "tile-on-field",
      rotation: tile.rotation,
      auxFieldId: CoordsHelper.createKeyFromCoordinates(tile.position) 
    });
    return await this._sceneService.sceneComposer.createTileOnField(tileDeclaration);
  }


  private async _updateBoardActors(s: IDungeonSceneState): Promise<void> {
    await Promise.all(Object.entries(s.board.actors).map(async ([id, tile]) => {
      let boardTile = this._sceneService.scene.getSceneObject<TileObject>(id);
      if (!boardTile) {
        boardTile = await this._createTile(id, tile);
      } else {
        this._sceneService.boardComponent.moveTile(boardTile, CoordsHelper.createKeyFromCoordinates(tile.position));
        this._sceneService.boardComponent.rotateTile(boardTile, tile.rotation);
      }

      if (tile.isSelected) {
        boardTile.select()
      } else {
        boardTile.unselect();
      }

      if (tile.isHighlighted) {
        boardTile.highlight();
      } else {
        boardTile.removeHighlight();
      }
    }));

    this._sceneService.boardComponent.getAllAttachedTiles()
      .forEach(t => {
        if (!s.board.actors[t.auxId]) {
          this._sceneService.sceneComposer.removeTile()
        }
      })
  }


  private async _updateBoardFields(s: IDungeonSceneState): Promise<void> {
    Object.entries(s.board.fields).forEach(([id, field]) => {
      const boardField = this._sceneService.boardComponent.getField(id);

      if (field.isHighlighted) {
        boardField.highlight();
      } else {
        boardField.removeHighlight();
      }

      if (field.isSelected) {
        boardField.select();
      } else {
        boardField.unselect();
      }

      if (field.isHighlightedRange) {
        boardField.highlightRange();
      } else {
        boardField.removeHighlightRange();
      }
    });
  }


}
