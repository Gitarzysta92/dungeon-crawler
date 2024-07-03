import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { IBoardAreaResident } from '@game-logic/gameplay/modules/board-areas/entities/board-resident/resident.interface';
import { IActivity, IActivitySubject } from '@game-logic/lib/base/activity/activity.interface';
import { INestedArea } from '@game-logic/lib/modules/areas/entities/area/area.interface';
import { IInteractableMedium } from 'src/app/core/game-ui/mixins/interactable-medium/interactable-medium.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { IUiMedium } from 'src/app/core/game-ui/mixins/ui-medium/ui-medium.interface';

@Component({
  selector: 'area-label',
  templateUrl: './area-label.component.html',
  styleUrls: ['./area-label.component.scss']
})
export class AreaLabelComponent implements OnInit, OnChanges {
  
  @Input() area: IBoardArea & INarrativeMedium & IUiMedium & IInteractableMedium
  activities: Array<IActivity & IInteractableMedium & IUiMedium>;

  @Output() onAreaExamination: EventEmitter<IBoardArea & INarrativeMedium & IUiMedium & IInteractableMedium> =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this._aggregateAreaActivities();
  }

  public examineArea(): void {
    if (this.area.isBoardArea && this.area.isUnlocked && this.area.nestedAreas.length > 0) {
      this.onAreaExamination.next(this.area);
    } 
  }

  public hover(e: MouseEvent): void {
    if (e.type === 'mouseenter') {
      this.area.isHovered = true;
    } else {
      this.area.isHovered = false;
    }
  }

  private _aggregateAreaActivities(): void {
    const activities = this.area.residents
      .reduce((acc, r: IActivitySubject & IBoardAreaResident) => acc.concat(r.activities ?? []), [])
      .concat(this.area.activities ?? []);
    
    this.area.traverseNestedAreas<INestedArea & IActivitySubject>(a => {
      a.activities?.forEach(a => activities.push(a))
    })
    
    this.activities = activities;
  }
  
}
