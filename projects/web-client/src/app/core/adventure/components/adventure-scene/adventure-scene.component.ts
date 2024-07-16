import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { IEntity } from '@game-logic/lib/base/entity/entity.interface';
import { IInteractableMedium } from 'src/app/core/game-ui/mixins/interactable-medium/interactable-medium.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { IUiMedium } from 'src/app/core/game-ui/mixins/ui-medium/ui-medium.interface';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { ControlsService } from 'src/app/infrastructure/controls/controls.service';

@Component({
  selector: 'adventure-scene',
  templateUrl: './adventure-scene.component.html',
  styleUrls: ['./adventure-scene.component.scss']
})
export class AdventureSceneComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() onAreaExamination: EventEmitter<IBoardArea & INarrativeMedium & IUiMedium & IInteractableMedium> =  new EventEmitter();

  constructor(
    public readonly sceneService: SceneService,
    private readonly _controlsService: ControlsService
  ) { }

  ngAfterViewInit(): void {
    this.sceneService.components.hexagonGrid.initializeFieldHovering(this._controlsService.listenForHoverEvent(this.sceneService.canvasRef) as any)
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.sceneService.dispose();
  }

  public handleEntityClick(e: PointerEvent | IEntity): void {
    // const v = new Vector2();
    // const is = this.sceneService.services.pointerHandler.intersect(getNormalizedCoordinates(e.clientX, e.clientY, v as any));
    // const entity = this._sceneInteractionService.extractSceneMediumFromIntersection(is as any)[0] as unknown as IEntity & Partial<IBoardArea> & Partial<IDungeonArea>;
    // const pawn = this.stateStore.currentState.getSelectedPawn();
    // if (entity && entity.isBoardArea && entity.nestedAreas.length > 0 && pawn.isAssigned(entity.position)) {
    //   this._auxiliaryViewService.openAuxiliaryView({ component: AreaViewComponent, layerId: 2 }, { area: entity }, this._injector);
    // } else if (entity && entity.isDungeonArea && pawn.isAssigned(entity.position)) {
    //   this._auxiliaryViewService.openAuxiliaryView({ component: DungeonViewComponent, layerId: 2 }, { dungeonArea: entity }, this._injector);
    // }
  }
}
