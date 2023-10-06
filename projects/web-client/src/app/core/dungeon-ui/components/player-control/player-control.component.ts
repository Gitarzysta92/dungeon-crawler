import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHero } from '@game-logic/lib/features/hero/hero.interface';
import { IPlayerControlAction } from '../../interfaces/player-control-action';
import { UiInteractionService } from '../../services/ui-interaction/ui-interaction.service';

@Component({
  selector: 'player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss']
})
export class PlayerControlComponent implements OnInit {

  @Input() hero: IHero;
  @Input() activities: IPlayerControlAction[];
  @Input() confirmation: boolean;
  
  @Output() activitySelected: EventEmitter<IPlayerControlAction> = new EventEmitter(); 

  constructor(private readonly _uiInteractionService: UiInteractionService) { }

  ngOnInit(): void {}

  public selectActivity(activity: IPlayerControlAction, event: MouseEvent) {
    event.stopPropagation();
    this.activitySelected.emit(activity);
  }

  public acceptActivity(): void {
    this._uiInteractionService.confirmActivity();
  }

  public rejectActivity(): void {
    this._uiInteractionService.abandonActivity();
  }
}
