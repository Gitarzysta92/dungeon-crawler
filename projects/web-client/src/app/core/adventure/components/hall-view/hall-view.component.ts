import { Component, OnInit } from '@angular/core';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { DataFeedService } from 'src/app/core/data/services/data-feed.service';
import { Observable, from, map, switchMap, tap } from 'rxjs';
import { IAreaDataFeedEntity } from 'src/app/core/data-feed/interfaces/data-feed-area-entity.interface';
import { RoutingService } from 'src/app/aspects/navigation/api';

@Component({
  selector: 'app-hall-view',
  templateUrl: './hall-view.component.html',
  styleUrls: ['./hall-view.component.scss']
})
export class HallViewComponent implements OnInit {
  
  public areas: Observable<IAreaDataFeedEntity[]>;

  constructor(
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _dataFeed: DataFeedService,
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {
    this._adventureStateStore.initializeStore(this._dataFeed);
    this.areas = this._adventureStateStore.state
      .pipe(
        map(s => s.hero.occupiedRootAreaId),
        switchMap(id => from(this._dataFeed.getArea(id))),
        switchMap(area => from(this._dataFeed.getAreas(area.childAreaIds)))
      )
  }


  public navigateToArea(area: IAreaDataFeedEntity): void {
    this._routingService.navigateToArea(area.areaType, area.id);
  }

}
