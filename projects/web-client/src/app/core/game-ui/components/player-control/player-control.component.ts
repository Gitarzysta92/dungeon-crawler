import { Component, OnInit } from '@angular/core';
import { UiInteractionService } from '../../services/ui-interaction.service';
import { IDungeonUiActivity } from '../../entities/interactable/interactable.factory';
import { DungeonUiStore } from '../../stores/dungeon-ui.store';
import { IDungeonUiState } from '../../states/dungeon-ui-state.factory';
import { Hero } from '@game-logic/lib/features/hero/hero';

@Component({
  selector: 'player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss']
})
export class PlayerControlComponent implements OnInit {

  public activities: IDungeonUiActivity[];
  public confirmationState: Omit<IDungeonUiState, 'activities' | 'hero'>;
  public hero: Hero;

  constructor(
    private readonly _uiInteractionService: UiInteractionService,
    private readonly _dungeonUiStore: DungeonUiStore
  ) { }

  ngOnInit(): void { 
    this._dungeonUiStore.state$
      .subscribe(({ activities, hero, ...confirmationState }) => {
        this.hero = hero;
        this.activities = activities;
        this.confirmationState = confirmationState;
      });
  }

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
