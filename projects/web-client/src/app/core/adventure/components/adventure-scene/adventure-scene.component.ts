import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { IEntity } from '@game-logic/lib/base/entity/entity.interface';
import { filter, map } from 'rxjs';
import { SceneInteractionService } from 'src/app/core/scene/api';
import { ISceneMedium } from 'src/app/core/scene/mixins/scene-medium/scene-medium.interface';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { ControlsService } from 'src/app/infrastructure/controls/controls.service';

@Component({
  selector: 'adventure-scene',
  templateUrl: './adventure-scene.component.html',
  styleUrls: ['./adventure-scene.component.scss']
})
export class AdventureSceneComponent implements AfterViewInit, OnDestroy {

  @Output() selectedArea: EventEmitter<IEntity> =  new EventEmitter();

  constructor(
    public readonly sceneService: SceneService,
    private readonly _controlsService: ControlsService,
    private readonly _sceneInteraction: SceneInteractionService
  ) { }


  ngAfterViewInit(): void {
    this.sceneService.components.hexagonGrid.initializeFieldHovering(this._controlsService.listenForHoverEvent(this.sceneService.canvasRef) as any)
    this._sceneInteraction.listenForSceneMediumSelection<IBoardArea & ISceneMedium>()
      .pipe(map(s => s.find(s => s.isBoardArea)))
      .subscribe(m => {
        if (m) {
          this.selectedArea.next(m)
        }
      })
  }

  ngOnDestroy(): void {
    this.sceneService.dispose();
  }
}
