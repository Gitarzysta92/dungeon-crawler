import { Component, Input, OnInit } from '@angular/core';
import { IHero } from '@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface';
import { IActivityResource } from '@game-logic/lib/base/activity/activity.interface';
import { IStatistic } from '@game-logic/lib/modules/statistics/entities/statistic/statistic.interface';
import { majorActionStatistic, minorActionStatistic } from 'src/app/core/game-data/constants/data-feed-statistics.data';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { DungeonStateStore } from '../../stores/dungeon-state.store';

@Component({
  selector: 'resources-bar',
  templateUrl: './resources-bar.component.html',
  styleUrls: ['./resources-bar.component.scss']
})
export class ResourcesBarComponent implements OnInit {

  @Input() pawn: IHero;
  public activityResources: Array<{ isMinor?: boolean, isMajor?: boolean, isMove?: boolean, value: number, name: string }>;

  constructor(
    private readonly _stateStore: DungeonStateStore
  ) { }

  ngOnInit(): void {
    this._updateActivityResources();
    this._stateStore.state$.subscribe(() => {
      this._updateActivityResources();
    })
  }


  private _updateActivityResources() {
    this.activityResources = Object.values(this.pawn.statistic)
    .filter(s => s.isActivityResource)
    .map((r: IStatistic & IActivityResource & INarrativeMedium) => {
      if (r.id === majorActionStatistic.id) {
        return { isMajor: true, class: 0, value: r.value, name: r.narrative.name }
      } else if (r.id === minorActionStatistic.id) {
        return { isMinor: true, value: r.value, name: r.narrative.name }
      } else {
        return { isMove: true, value: r.value, name: r.narrative.name }
      }
    });
  }

}
