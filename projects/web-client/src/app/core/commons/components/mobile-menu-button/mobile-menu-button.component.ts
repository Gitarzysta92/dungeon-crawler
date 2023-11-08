import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Menu, MenuItem } from 'src/app/aspects/navigation/api';
import { StoreService } from 'src/app/infrastructure/data-store/api';

@Component({
  selector: 'mobile-menu-button',
  templateUrl: './mobile-menu-button.component.html',
  styleUrls: ['./mobile-menu-button.component.scss']
})
export class MobileMenuButtonComponent implements OnInit {

  @Input() locations: Observable<Menu>[];

  public count: Observable<number>;

  constructor(
    private readonly _store: StoreService
  ) { }

  ngOnInit(): void {
    if (!!this.locations && !Array.isArray(this.locations)) {
      this.locations = [this.locations]
    };

    this.count = combineLatest(this.locations || [of(null)])
      .pipe(
        map(menus => menus.reduce((acc, curr) => curr?.items ? acc.concat(curr?.items) : [] ,[]) as MenuItem[]),
        map(items => items.filter(i => !!i.counterDataProvider).map(i => i.counterDataProvider(this._store))),
        switchMap(items => combineLatest(items)),
        map(items => items.reduce((acc, curr) => acc += curr , 0)),
      )
  }
}

