import { Component, Input, OnInit } from '@angular/core';
import { IHero } from '@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface';
import { IActivityResource } from '@game-logic/lib/base/activity/activity.interface';
import { IStatistic } from '@game-logic/lib/modules/statistics/entities/statistic/statistic.interface';

@Component({
  selector: 'resources-bar',
  templateUrl: './resources-bar.component.html',
  styleUrls: ['./resources-bar.component.scss']
})
export class ResourcesBarComponent implements OnInit {

  @Input() pawn: IHero;
  public activityResources: (IStatistic & IActivityResource)[];

  constructor() { }

  ngOnChanges(): void {
    this.activityResources = Object.values(this.pawn.statistic).filter(s => s.isActivityResource);
  }

  ngOnInit(): void {
  }

}
