import { TileObject } from '@3d-scene/lib/actors/game-objects/tile.game-object';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { Observable } from 'rxjs';
import { IDungeonSceneState } from '../../interfaces/dungeon-scene-state';
import { SceneInitializationService } from '../../services/scene-initialization/scene-initialization.service';

@Component({
  selector: 'scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef | undefined;

  @Input() state$: Observable<IDungeonSceneState>

  constructor(
    private readonly _sceneService: SceneInitializationService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) { 
    this._changeDetectorRef.detach();
  }

  ngOnInit(): void {
    this.state$.subscribe(s => {
      Object.entries(s.board.fields).forEach(([id, field]) => {
        const boardField = this._sceneService.boardComponent.getField(id);

        if (field.isHighlighted) {
          boardField.highlight();
          console.log('asd')
        } else {
          boardField.removeHighlight();
        }

        if (field.isSelected) {
          boardField.select();
        } else {
          boardField.removeSelect();
        }

        // if (field.isHighlightedRange) {
        //   boardField.highlightRange();
        // } else {
        //   boardField.removeHighlightRange();
        // }

      });

      Object.entries(s.board.actors).forEach(([id, tile]) => {
        const boardTile = this._sceneService.scene.getSceneObject<TileObject>(id);
        if (!boardTile) {
          return;
        }

        if (tile.isSelected) {
          boardTile.select()
        } else {
          boardTile.unselect();
        }

        this._sceneService.boardComponent.moveTile(boardTile, CoordsHelper.createKeyFromCoordinates(tile.position));
      })
    })
  }

  @HostListener('window:resize')
  onResize() {
    this._sceneService.adjustRendererSize();
  }
}
