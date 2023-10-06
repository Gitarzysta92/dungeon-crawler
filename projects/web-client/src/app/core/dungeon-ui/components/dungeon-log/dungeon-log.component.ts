import { Component, Input } from '@angular/core';
import { IDungeonActivityLogState } from '../../interfaces/dungeon-activity-log-entry';

@Component({
  selector: 'dungeon-log',
  templateUrl: './dungeon-log.component.html',
  styleUrls: ['./dungeon-log.component.scss']
})
export class DungeonLogComponent {

  @Input() logState: IDungeonActivityLogState;

  constructor() { }

}
