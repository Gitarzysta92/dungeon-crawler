import { IRawVector3 } from '@3d-scene/lib/extensions/types/raw-vector3';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { CubeCoordsHelper } from '@game-logic/lib/modules/board/helpers/coords.helper';
import { Store } from '@utils/store/store';
import { area1 } from 'src/app/core/game-data/constants/data-feed-areas';
import { IInteractableMedium } from 'src/app/core/game-ui/mixins/interactable-medium/interactable-medium.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { map2dCoordsToCubeCoords, mapCubeCoordsTo3dCoords } from 'src/app/core/scene/misc/coords-mappings';
import { ISceneMedium } from 'src/app/core/scene/mixins/scene-medium/scene-medium.interface';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { v4 } from "uuid";

@Component({
  selector: 'editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.scss']
})
export class EditorViewComponent implements OnInit, OnChanges, OnDestroy {

  @Input() scene: SceneService;
  @Input() store: Store<{ entities: Array<IBoardArea & ISceneMedium & INarrativeMedium & IInteractableMedium> }>;
  @Output() deactivated: EventEmitter<void> = new EventEmitter();

  constructor() { }
  
  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    const coords = this._getSurroundingCoords();
    this.scene.components.boardCreationComponent.showCreationFields(coords);
    // this.scene.components.boardCreationComponent
    //   .listenForCreationFieldClick()
    //   .subscribe(v => {
    //     this.createField(v);
    //   })
  }

  ngOnDestroy(): void {
    this.scene.components.boardCreationComponent.hideCreationFields();
  }

  public updateScene(e?: ISceneMedium) {
    if (e) {
      e.updateScenePosition();
    }
  }

  public closeEditor() {
    this.deactivated.next();
  }

  public createField(v: IRawVector3): void {
    const newArea = Object.assign({ ...area1 }, {
      id: v4(),
      position: map2dCoordsToCubeCoords({ x: v.x, y: v.z }),
      nestedAreas: []
    })

    this.store.currentState.entities.push()
  }

  private _getSurroundingCoords() {
    const surroundingFields = new Map();
    const fields = new Map(this.store.currentState.entities.filter(e => e.position).map(e => [CubeCoordsHelper.createKeyFromCoordinates(e.position) as string, e]))

    for (let area of this.store.currentState.entities) {
      if (!area.isBoardArea) {
        continue;
      }
      const surroundingCoords = CubeCoordsHelper.getCircleOfCoordinates(area.position, 1);
      for (let coords of surroundingCoords) {
        const key = CubeCoordsHelper.createKeyFromCoordinates(coords);
        if (fields.has(key) || surroundingFields.has(key)) {
          continue;
        }
        surroundingFields.set(key, coords);
      }
    }
    const r = [];

    for (let sf of surroundingFields.values()) {
      r.push(mapCubeCoordsTo3dCoords(sf))
    }

    return r;
  }

}
