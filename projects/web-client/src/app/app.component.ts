import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ConfigurationService } from './infrastructure/configuration/api';
import { IndexedDbService, StoreService } from './infrastructure/data-store/api';
import { DataFeedService } from './core/data/services/data-feed.service';

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit, OnDestroy {

  private _destroyed: Subject<void> = new Subject();

  constructor(
    private readonly _storeService: StoreService,
    private readonly _config: ConfigurationService,
    private readonly _indexedDbService: IndexedDbService,
    private readonly _dataFeedService: DataFeedService,
  ) { }

  ngOnInit(): void {
    if (!this._config.isProduction) {
      this._storeService.state
        .pipe(takeUntil(this._destroyed))
        .subscribe(s => console.log(s));
    }

    this._indexedDbService.registerDefaultStore();
    this._dataFeedService.loadData();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

}
