import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GameUiStore } from '../../../game-ui/stores/game-ui.store';

@Component({
  selector: 'actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.scss']
})
export class ActorsListComponent implements OnInit {

  public actors$: Observable<any[]>;

  constructor(
    private readonly _dungeonUiStore: GameUiStore
  ) { }

  ngOnInit(): void {
    this.actors$ = this._dungeonUiStore.state$
      .pipe(map(a => a as any))
  }

  public trackBy(index, item): string {
    return item.id; 
  }

}