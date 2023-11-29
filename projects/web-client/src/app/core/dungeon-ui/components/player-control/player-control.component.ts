import { Component, Input, OnInit } from '@angular/core';
import { IHero } from '@game-logic/lib/features/hero/hero.interface';
import { UiInteractionService } from '../../services/ui-interaction/ui-interaction.service';
import { IDungeonUiActivity } from '../../interfaces/dungeon-ui-activity';
import { IDungeonUiState } from '../../interfaces/dungeon-ui-state';
import { DataFeedService } from 'src/app/core/data-feed/services/data-feed.service';
import { DungeonUiStore } from '../../stores/dungeon-ui.store';
import { map, switchMap, zip } from 'rxjs';

@Component({
  selector: 'player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss']
})
export class PlayerControlComponent implements OnInit {

  @Input() hero: IHero;
  @Input() activities: IDungeonUiActivity[];
  @Input() confirmationState: IDungeonUiState;

  constructor(
    private readonly _uiInteractionService: UiInteractionService,
  ) { }

  ngOnInit(): void { 
    // this._dungeonUiStoreService.state$
    //   .pipe(switchMap(state => {
    //     const ids = state.activities.map(a => a.id)
    //     return zip([
    //       this._dataFeedService.getSpellsAndAbilities(ids),
    //       this._dataFeedService.getActors(ids)
    //     ]).pipe(map(f => {
    //       const data = f.flatMap(x => x as any);
    //       state.activities = state.activities.map(a => Object.assign(a,  data))
    //     }))
    //   }))
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
