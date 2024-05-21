import { Component, Input, OnInit } from '@angular/core';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { IInteractableMedium } from 'src/app/core/game-ui/mixins/interactable-medium/interactable-medium.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { IUiMedium } from 'src/app/core/game-ui/mixins/ui-medium/ui-medium.interface';

@Component({
  selector: 'area-label',
  templateUrl: './area-label.component.html',
  styleUrls: ['./area-label.component.scss']
})
export class AreaLabelComponent implements OnInit {
  
  @Input() data: IBoardArea & INarrativeMedium & IUiMedium & IInteractableMedium


  constructor() { }

  ngOnInit(): void {
  }

  hover(e: MouseEvent): void {
    if (e.type === 'mouseenter') {
      this.data.isHovered = true;
    } else {
      this.data.isHovered = false;
    }
  }

}
