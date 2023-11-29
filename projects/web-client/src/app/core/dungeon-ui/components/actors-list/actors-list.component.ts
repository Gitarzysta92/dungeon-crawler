import { Component, Input, OnInit } from '@angular/core';
import { IActor, IBasicStats, ISecondaryStats } from '@game-logic/lib/features/actors/actors.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.scss']
})
export class ActorsListComponent implements OnInit {

  @Input() actors$: Observable<IActor & IBasicStats & Partial<ISecondaryStats>>;

  constructor() { }

  ngOnInit(): void {
  }

}