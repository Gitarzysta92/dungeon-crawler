import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ConfigurationService } from './infrastructure/configuration/api';
import { IndexedDbService, StoreService } from './infrastructure/data-storage/api';
import { trigger, transition, style, animate, animateChild, group, query } from '@angular/animations';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: '0',
            left: '0',
            height: '100vh',
            width: '100%',
          })
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 })
        ], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            animate('300ms 300ms ease-out', style({ opacity: 1 }))
          ], { optional: true }),
          query('@*', animateChild(), { optional: true })
        ]),
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  public showLoader$: Observable<boolean>;
  private _destroyed: Subject<void> = new Subject();
  private _loader: Subscription;
  
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
    // this._loader.unsubscribe();
  }

}
