import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IHero } from '@game-logic/lib/features/hero/hero.interface';
import { IPlayerControlAction } from '../../interfaces/player-control-action';

@Component({
  selector: 'player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss']
})
export class PlayerControlComponent {

  @Input() hero: IHero;
  @Input() activities: IPlayerControlAction[];

  @Output() activitySelected: EventEmitter<IPlayerControlAction> = new EventEmitter(); 

  constructor() { }

  public selectActivity(activity: IPlayerControlAction, event: MouseEvent) {
    event.stopPropagation();
    this.activitySelected.emit(activity);
    this.activities.forEach(a => a.isSelected = false);
    activity.isSelected = true;
  }
}
