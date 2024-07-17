import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IHero } from '@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface';
import { ITurnGameplayPlayer } from '@game-logic/lib/modules/turn-based-gameplay/mixins/turn-based-player/turn-based-player.interface';
import { IActivityResource } from '@game-logic/lib/base/activity/activity.interface';
import { IStatistic } from '@game-logic/lib/modules/statistics/entities/statistic/statistic.interface';

@Component({
  selector: 'turn-controls',
  templateUrl: './turn-controls.component.html',
  styleUrls: ['./turn-controls.component.scss']
})
export class TurnControlsComponent implements OnInit, OnChanges {

  @Input() pawn: IHero;
  @Input() player: ITurnGameplayPlayer;
  public activityResources: (IStatistic & IActivityResource)[];

  constructor(
    public readonly stateStore: DungeonStateStore,
  ) { }

  ngOnChanges(): void {
    this.activityResources = Object.values(this.pawn.statistic).filter(s => s.isActivityResource);
  }

  ngOnInit(): void {
  }

  public nextTurn() {
    this.stateStore.currentState.nextTurn();
    this.stateStore.setState(this.stateStore.currentState);
  }

}
