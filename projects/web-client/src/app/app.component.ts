import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, delay, takeUntil } from 'rxjs';
import { ConfigurationService } from './infrastructure/configuration/api';
import { IndexedDbService, StoreService } from './infrastructure/data-store/api';
import { DataSeedService } from './core/data/services/data-seed.service';
import { seed } from './core/data/constants/data-seed';
import { RoutingService } from './aspects/navigation/api';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      // Entry animation
      transition(':enter', [
        style({ opacity: 0 }),  // Start with an invisible state
        animate('0.5s', style({ opacity: 1 }))  // Animate to an opaque state
      ]),
      // Exit animation
      transition(':leave', [
        style({ opacity: 1 }),  // Start with an opaque state
        animate('0.5s', style({ opacity: 0 }))  // Animate to an invisible state
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  private _destroyed: Subject<void> = new Subject();
  showLoader: boolean;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _config: ConfigurationService,
    private readonly _indexedDbService: IndexedDbService,
    private readonly _dataFeedService: DataSeedService,
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {
    if (!this._config.isProduction) {
      this._storeService.state
        .pipe(takeUntil(this._destroyed))
        .subscribe(s => console.log(s));
    }

    this._indexedDbService.registerDefaultStore();
    this._dataFeedService.loadData(seed);

    this._routingService.onNavigationStart
      .pipe(takeUntil(this._destroyed))
      .subscribe(n => {
        const data = this.extractRouteDataFromSnapshot(n.state);
        const prev = n.previousNavigation?.finalUrl?.toString();
        const tUrl = n.url?.split("/")
        const hasSameSegment = prev?.split("/").some(s => tUrl.find(t => t === s))
        const showCondition = !data.loader?.skipWhenSameBranch || !hasSameSegment || !prev;
        if (data.loader && data.loader.show && showCondition) {
          this.showLoader = true
        }
      });
    this._routingService.onNavigationEnd
      .pipe(delay(3000),takeUntil(this._destroyed))
      .subscribe(() => this.showLoader = false);
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  extractRouteDataFromSnapshot(state: RouterStateSnapshot): any {
    let data = {};
    function extractDataFromRoute(route: ActivatedRouteSnapshot): void {
      if (route) {
        if (route.data) {
          Object.assign(data, route.data);
        }
        route.children.forEach(childRoute => extractDataFromRoute(childRoute));
      }
    }
    extractDataFromRoute(state.root);
    return data;
  }
}
