import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { Observable, Subject, delay, takeUntil } from 'rxjs';
import { ConfigurationService, MAIN_INITIALIZE } from './infrastructure/configuration/api';
import { IndexedDbService, StoreService } from './infrastructure/data-storage/api';
import { DataSeedService } from './core/data/services/data-seed.service';
import { gameplaySeed } from './core/data/constants/data-seed';
import { trigger, transition, style, animate, animateChild, group, query } from '@angular/animations';
import { persistanceSeed } from './core/game-persistence/constants/game-persistence.constants';
import { IMainInitializer } from './infrastructure/configuration/models/main-initializer';
import { NavigationLoaderService } from './aspects/navigation/services/navigation-loader.service';
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
            top: 0,
            left: 0,
            height: '100vh',
            width: '100%'
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
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),  // Start with an invisible state
        animate('0.3s', style({ opacity: 1 }))  // Animate to an opaque state
      ]),
      transition(':leave', [
        style({ opacity: 1 }),  // Start with an opaque state
        animate('0.3s', style({ opacity: 0 }))  // Animate to an invisible state
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  public showLoader$: Observable<boolean>;
  private _destroyed: Subject<void> = new Subject();
  
  constructor(
    private readonly _storeService: StoreService,
    private readonly _config: ConfigurationService,
    private readonly _indexedDbService: IndexedDbService,
    private readonly _dataFeedService: DataSeedService,
    private readonly _navigationLoaderService: NavigationLoaderService,
    @Optional() @Inject(MAIN_INITIALIZE) private readonly _initializers: IMainInitializer[]
  ) { }

  ngOnInit(): void {
    this._initializers.forEach(i => i.initialize());

    if (!this._config.isProduction) {
      this._storeService.state
        .pipe(takeUntil(this._destroyed))
        .subscribe(s => console.log(s));
    }

    this._indexedDbService.registerDefaultStore();
    this._dataFeedService.loadData(gameplaySeed);
    this._dataFeedService.loadData(persistanceSeed);

    this.showLoader$ = this._navigationLoaderService.listenForLoaderIndicator();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}
