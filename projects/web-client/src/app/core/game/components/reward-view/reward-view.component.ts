import { Component, Input, OnInit } from '@angular/core';
import { IRewarder } from '@game-logic/lib/modules/rewards/entities/rewarder/rewarder.interface';

@Component({
  selector: 'reward-view',
  templateUrl: './reward-view.component.html',
  styleUrls: ['./reward-view.component.scss']
})
export class RewardViewComponent implements OnInit {

  @Input() rewarder: IRewarder;

  constructor() { }

  ngOnInit(): void {}

}
