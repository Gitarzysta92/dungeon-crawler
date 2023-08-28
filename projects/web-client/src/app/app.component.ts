import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ConfigurationService } from './infrastructure/configuration/api';
import { StoreService } from './infrastructure/data-store/api';

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit, OnDestroy {

  private _destroyed: Subject<void> = new Subject();

  constructor(
    private readonly _storeService: StoreService,
    private readonly _config: ConfigurationService
  ) { }

  ngOnInit(): void {
    if (!this._config.isProduction) {
      this._storeService.state
        .pipe(takeUntil(this._destroyed))
        .subscribe(s => console.log(s));
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

}
