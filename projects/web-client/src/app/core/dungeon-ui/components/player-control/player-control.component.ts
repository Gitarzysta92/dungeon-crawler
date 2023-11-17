import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHero } from '@game-logic/lib/features/hero/hero.interface';
import { UiInteractionService } from '../../services/ui-interaction/ui-interaction.service';
import { IDungeonUiActivity } from '../../interfaces/dungeon-ui-activity';

@Component({
  selector: 'player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss']
})
export class PlayerControlComponent implements OnInit {

  @Input() hero: IHero;
  @Input() activities: IDungeonUiActivity[];
  @Input() confirmation: boolean;
  @Input() confirmationEarly: boolean;

  constructor(private readonly _uiInteractionService: UiInteractionService) { }

  ngOnInit(): void { }

  public selectActivity(activity: IDungeonUiActivity, event: MouseEvent) {
    event.stopPropagation();
    this._uiInteractionService.selectActivity(activity);
  }

  public acceptActivityEarly(): void {
    this._uiInteractionService.confirmActivityEarly();
  }

  public acceptActivity(): void {
    this._uiInteractionService.confirmActivity();
  }

  public rejectActivity(): void {
    this._uiInteractionService.abandonActivity();
  }

}
