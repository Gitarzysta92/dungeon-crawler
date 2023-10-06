import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'players-score',
  templateUrl: './players-score.component.html',
  styleUrls: ['./players-score.component.scss']
})
export class PlayersScoreComponent implements OnInit {

  @Input() players: any[]

  constructor() { }

  ngOnInit(): void {}

}
