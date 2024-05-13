import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ConfigurationService } from './infrastructure/configuration/api';
import { IndexedDbService, StoreService } from './infrastructure/data-storage/api';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  public showLoader$: Observable<boolean>;
  private _destroyed: Subject<void> = new Subject();
  
  constructor(
    private readonly _storeService: StoreService,
    private readonly _config: ConfigurationService,
    private readonly _indexedDbService: IndexedDbService,
  ) { }

  ngOnInit(): void {
    if (!this._config.isProduction) {
      this._storeService.state
        .pipe(takeUntil(this._destroyed))
        .subscribe(s => console.log(s));
    }
    this._indexedDbService.registerDefaultStore();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

}
