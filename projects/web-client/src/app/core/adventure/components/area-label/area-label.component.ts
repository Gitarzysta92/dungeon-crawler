import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { IActivity } from '@game-logic/lib/base/activity/activity.interface';
import { Subject, Subscription } from 'rxjs';
import { IInteractableMedium } from 'src/app/core/game-ui/mixins/interactable-medium/interactable-medium.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { IUiMedium } from 'src/app/core/game-ui/mixins/ui-medium/ui-medium.interface';
import { UiService } from 'src/app/core/game-ui/services/ui.service';
import { AdventureStateStore } from '../../stores/adventure-state.store';

@Component({
  selector: 'area-label',
  templateUrl: './area-label.component.html',
  styleUrls: ['./area-label.component.scss']
})
export class AreaLabelComponent implements OnInit, OnDestroy {
  
  @Input() area: IBoardArea & INarrativeMedium & IUiMedium & IInteractableMedium
  @Output() onAreaExamination: EventEmitter<IBoardArea & INarrativeMedium & IUiMedium & IInteractableMedium> = new EventEmitter();
  public activities: Array<IActivity & IInteractableMedium & IUiMedium>;
  private _onSelection: Subject<IBoardArea & INarrativeMedium & IUiMedium & IInteractableMedium> = new Subject();
  private _stateS: Subscription;

  constructor(
    private readonly _stateStore: AdventureStateStore,
    private readonly _uiService: UiService
  ) { }
  
  ngOnInit(): void {
    this._stateS = this._stateStore.state$.subscribe(s => {
      this.activities = s.getAvailableAreaActivities(this.area)
    })
    this._uiService.registerSelectionProvider(this._onSelection);
  }

  ngOnDestroy(): void {
    this._uiService.unregisterSelectionProvider(this._onSelection);
    this._onSelection.complete();
    this._stateS.unsubscribe();
  }

  public examineArea(): void {
    if (this.area.isBoardArea && this.area.isUnlocked && this.area.nestedAreas.length > 0) {
      this.onAreaExamination.next(this.area);
    } 
    this._onSelection.next(this.area);
  }

  public hover(e: MouseEvent): void {
    if (e.type === 'mouseenter') {
      this.area.isHovered = true;
    } else {
      this.area.isHovered = false;
    }
  }
  
}
