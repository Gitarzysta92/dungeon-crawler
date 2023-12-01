import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { SoundEffectsService } from 'src/app/aspects/sound-effects/api';
import { StoreService } from 'src/app/infrastructure/data-store/api';
import { AuthenticationService } from '../../services/authentication/authentication.service';


@Component({
  selector: 'app-logout-view',
  templateUrl: './logout-view.component.html',
  styleUrls: ['./logout-view.component.scss']
})
export class LogoutViewComponent implements OnInit {

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _authenticationService: AuthenticationService,
    private readonly _storeService: StoreService,
    private readonly _soundEffectsService: SoundEffectsService
  ) { }

  ngOnInit(): void {
    this._authenticationService.unauthenticate();
    this._storeService.closeStores();
    this._soundEffectsService.clearAll();
    timer(2000)
      .subscribe(() => {
        this._routingService.nagivateToLogin();
      })
  }

}
