import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { StoreService } from 'src/app/infrastructure/data-store/api';
import { ExpendableMenuItem } from '../../models/expendable-menu-item';
import { Menu, MenuItem } from '../../models/menu';
import { RoutingService } from '../../services/routing/routing.service';

@Component({
  selector: 'navigational-menu',
  templateUrl: './navigational-menu.component.html',
  styleUrls: ['./navigational-menu.component.scss'],
  host: {
    '[class]': 'type'
  }
})
export class NavigationalMenuComponent implements OnInit {

  @Input() locations: Observable<Menu>[];

  @Input('vertical') set listType(_) { this.type = 'vertical' }
  @Input('horizontal') set inlineType(_) { this.type = 'horizontal' }
  @Input('showIcons') set showIcons(_) { this.icons = true }

  public data: Array<MenuItem>;
  public type: 'vertical' | 'horizontal' = 'horizontal';
  public icons: boolean = false;

  private _destroyed: Subject<void> = new Subject()

  constructor(
    private readonly routing: RoutingService,
    private readonly _store: StoreService
  ) {}

  ngOnInit(): void {
    if (!!this.locations && !Array.isArray(this.locations)) {
      this.locations = [this.locations]
    };

    combineLatest(this.locations || [of(null)])
      .pipe(
        map(menus => menus.reduce((acc, curr) => curr?.items ? acc.concat(curr?.items) : [], [])),
        takeUntil(this._destroyed)
      )
      .subscribe(items => {
        this.data = items.map(i => this._createMenuItem(i));
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public navigateTo(url): void {
    this.routing.navigate(url);
  }

  private _createMenuItem(item: MenuItem): ExpendableMenuItem {
    const expendableItem = new ExpendableMenuItem({
      ...item,
      counterData: !!item.counterDataProvider ? item.counterDataProvider(this._store) : null
    });

    return expendableItem
  }
}



