import { IActor } from '@3d-scene/lib/actors/actor.interface';
import { Component, Input, OnInit } from '@angular/core';
import { IStatisticBearer } from '@game-logic/lib/modules/statistics/entities/bearer/statistic-bearer.interface';

@Component({
  selector: 'creature-bar',
  templateUrl: './creature-bar.component.html',
  styleUrls: ['./creature-bar.component.scss']
})
export class CreatureBarComponent implements OnInit {

  @Input() creature: IActor & IStatisticBearer

  constructor() { }

  ngOnInit(): void {
    //console.log(this.creature);
  }

}
