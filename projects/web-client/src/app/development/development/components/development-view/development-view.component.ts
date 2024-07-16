import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Menu, MenuItem, MenuLocation, MenuService, RoutingService } from 'src/app/aspects/navigation/api';
import { INITIALIZATION_LOADING_SCREEN } from 'src/app/infrastructure/configuration/api';
import { LoadingScreenService } from 'src/app/shared/loaders/services/loading-screen.service';

@Component({
  selector: 'app-development-view',
  templateUrl: './development-view.component.html',
  styleUrls: ['./development-view.component.scss']
})
export class DevelopmentViewComponent implements OnInit {
  public menuData$: Observable<Menu>;

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _menuService: MenuService,
    private readonly _loadingScreenService: LoadingScreenService
  ) { }

  ngOnInit(): void {
    this._loadingScreenService.hideLoadingScreen(INITIALIZATION_LOADING_SCREEN);
    this.menuData$ = this._menuService.getMenuData(MenuLocation.DevelopmentPrimaryMenu)
    .pipe(map(p => {
      return p;
    }));
  }
  
  public navigate(item: MenuItem): void {
    this._routingService.navigate(item.fragments);
  }

}