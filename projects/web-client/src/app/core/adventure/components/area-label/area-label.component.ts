import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { IBoardAreaResident } from '@game-logic/gameplay/modules/board-areas/entities/board-resident/resident.interface';
import { IActivity, IActivitySubject } from '@game-logic/lib/base/activity/activity.interface';
import { IInteractableMedium } from 'src/app/core/game-ui/mixins/interactable-medium/interactable-medium.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { IUiMedium } from 'src/app/core/game-ui/mixins/ui-medium/ui-medium.interface';

@Component({
  selector: 'area-label',
  templateUrl: './area-label.component.html',
  styleUrls: ['./area-label.component.scss']
})
export class AreaLabelComponent implements OnInit, OnChanges {
  
  @Input() data: IBoardArea & INarrativeMedium & IUiMedium & IInteractableMedium
  activities: Array<IActivity & IInteractableMedium & IUiMedium>;

  @Output() onAreaExamination: EventEmitter<IBoardArea & INarrativeMedium & IUiMedium & IInteractableMedium> =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.activities = this.data.residents
      .reduce((acc, r: IActivitySubject & IBoardAreaResident) => acc.concat(r.activities ?? []), [])
      .concat(this.data.activities ?? []);
  }

  public examineArea(): void {
    if (this.data.isBoardArea && this.data.isUnlocked && this.data.nestedAreas.length > 0) {
      this.onAreaExamination.next(this.data);
    } 
  }

  hover(e: MouseEvent): void {
    if (e.type === 'mouseenter') {
      this.data.isHovered = true;
    } else {
      this.data.isHovered = false;  
    }
  }

}
