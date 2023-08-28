import { Component, Input, OnInit } from '@angular/core';
import { GameplayLoggerService } from '../../../dungeon/services/gameplay-logger/logger.service';

@Component({
  selector: 'gameplay-log',
  templateUrl: './gameplay-log.component.html',
  styleUrls: ['./gameplay-log.component.scss']
})
export class GameplayLogComponent implements OnInit {

  @Input() logs: any;

  constructor(
    private readonly _gameplayLogger: GameplayLoggerService
  ) { }

  ngOnInit(): void {
    this._gameplayLogger.logs$
      .subscribe(ls => {
        this.logs = ls.map(l => this._mapLogs(l));
        console.log(this.logs)
      })


    this.logs = [
      
    ]
  }

  private _mapLogs(log: any) {
    return { message: log.name, icon: 'warning' }
  }

}
