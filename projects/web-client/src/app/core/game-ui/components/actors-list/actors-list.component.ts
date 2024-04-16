import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DungeonUiStore } from '../../stores/dungeon-ui.store';
import { IUiActor } from '../../states/dungeon-ui-state.factory';

@Component({
  selector: 'actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.scss']
})
export class ActorsListComponent implements OnInit {

  public actors$: Observable<IUiActor[]>;

  constructor(
    private readonly _dungeonUiStore: DungeonUiStore
  ) { }

  ngOnInit(): void {
    this.actors$ = this._dungeonUiStore.state$
      .pipe(map(a => a.actors))
  }

  public trackBy(index, item): string {
    return item.id; 
  }

}