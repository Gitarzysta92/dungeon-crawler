import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { IActivity } from '@game-logic/lib/base/activity/activity.interface';


@Component({
  selector: 'area-view',
  templateUrl: './area-view.component.html',
  styleUrls: ['./area-view.component.scss']
})
export class AreaViewComponent implements OnInit {

  @Input() area: IBoardArea;

  @Output() activitySelected: EventEmitter<IActivity> = new EventEmitter()

  constructor(
    private readonly _adventureStore: AdventureStateStore
  ) { }

  ngOnInit(): void {
    const availableQuests = [];
    const resolvableQuests = [];
    const unresolvableQuests = [];
  }

  public selectActivity(a: IActivity) {
    this.activitySelected.next(a);
  }

}
