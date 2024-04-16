import { Component, OnInit } from '@angular/core';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { DataFeedService } from 'src/app/core/data/services/data-feed.service';
import { ModalService } from 'src/app/shared/dialogs/api';
import { GameMenuComponent } from 'src/app/core/menus/components/game-menu/game-menu.component';
import { RoutingService } from 'src/app/aspects/navigation/api';

@Component({
  selector: 'adventure-view',
  templateUrl: './adventure-view.component.html',
  styleUrls: ['./adventure-view.component.scss'],
})
export class AdventureViewComponent implements OnInit {

  public view: any 

  constructor(
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _dataFeed: DataFeedService,
    private readonly _modalService: ModalService,
    private readonly _routingService: RoutingService
  ) { }

  async ngOnInit(): Promise<void> {
    // const dungeonAreaId = adventureState.dungeonInstance?.assignedAreaId;
    // if (dungeonAreaId) {
    //   this._routingService.navigateToArea(AreaType.Dungeon, dungeonAreaId);
    // }

    // this._adventureStateStore.state
    //   .pipe(
    //     map(s => s.hero.occupiedRootAreaId),
    //     switchMap(id => from(this._dataFeed.getArea(id))),
    //     switchMap(area => from(this._dataFeed.getAreas(area.childAreaIds)))
    //   )
    //   .subscribe(a => console.log(a));
    //console.log(this._adventureStateStore.currentState);
  }

  public openModal() {
    this._modalService.open(GameMenuComponent)
  }

}
