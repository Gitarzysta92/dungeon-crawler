import { Component, Input, OnInit } from '@angular/core';
import { IStatsTableStatistic } from '../../interfaces/stats-table.interface';

@Component({
  selector: 'stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.scss']
})
export class StatsTableComponent implements OnInit {

  @Input() stats: IStatsTableStatistic[]

  constructor() { }

  ngOnInit(): void {}

}
