import { Component, OnInit } from '@angular/core';
import { IDungeonActivityLogEntry } from '../../../game-ui/interfaces/dungeon-activity-log-entry';
import { Observable, map } from 'rxjs';
// import { DungeonActivityLogStore } from '../../../game-ui/stores/dungeon-activity-log.store';

@Component({
  selector: 'dungeon-log',
  templateUrl: './dungeon-log.component.html',
  styleUrls: ['./dungeon-log.component.scss']
})
export class DungeonLogComponent implements OnInit {

  public logs$: Observable<IDungeonActivityLogEntry[]>

  constructor(
    // private readonly _dungeonActivityLog: DungeonActivityLogStore
  ) { }

  ngOnInit(): void {
    // this.logs$ = this._dungeonActivityLog.state$
    //   .pipe(map(l => l.entries.map(e => Object.assign( { showDetails: false }, e))))
  }

  public toggleDetails(entry: IDungeonActivityLogEntry): void {
    entry.showDetails = !entry.showDetails;
  }

}
