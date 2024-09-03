import { Component, Input, OnInit } from '@angular/core';
import { IStatisticBearer } from '@game-logic/lib/modules/statistics/entities/bearer/statistic-bearer.interface';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { SceneMediumFactory } from 'src/app/core/scene/mixins/scene-medium/scene-medium.factory';

@Component({
  selector: 'statistic-change-indicator',
  templateUrl: './statistic-change-indicator.component.html',
  styleUrls: ['./statistic-change-indicator.component.scss'],
  animations: [
    trigger('damage', [
      transition(':enter', [
        animate('1000ms', keyframes([
          style({ transform: "scale(0) translateY(0px)", opacity: 0, offset: 0 }),
          style({ transform: "scale(2.5) translateY(-50px)", opacity: 1, offset: 0.5 }),
          style({ transform: "scale(1.5) translateY(-100px)", opacity: 0, offset: 1 })
        ]))
      ])
    ])
  ]
})
export class StatisticChangeIndicatorComponent implements OnInit {

  public indicators: Array<{ value: number, color: string }> = [];

  constructor(
    private readonly _stateStore: DungeonStateStore
  ) { }

  ngOnInit(): void {
    this._stateStore.currentState.onDamageDealt()
      .subscribe(e => {
        const indicator = {
          value: e.value.damage,
          color: this.getDamageColor(e.value.damageType),
        }

        if (SceneMediumFactory.isSceneMedium(e.receiver)) {
          const coords = SceneMediumFactory.asSceneMedium(e.receiver).viewportCoords;
          Object.assign(indicator, { position: `translate(${coords.x}px, ${coords.y}px)` })
        }

        this.indicators.push(indicator);
      })
  }

  public damageAnimationEnd(indicator: any) {
    this.indicators = this.indicators.filter(i => i !== indicator);
  }

  public getDamageColor(damageType: number) {
    if (damageType === 0) {
      return "#fff"
    }
  }

}
