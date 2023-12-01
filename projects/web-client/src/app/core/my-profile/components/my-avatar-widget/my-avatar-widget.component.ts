import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { MyProfileStore } from '../../stores/my-profile.store';

@Component({
  selector: 'my-avatar-widget',
  template: `
    <div class="img-wrapper" (click)="navigateToMyProfile()">
      <img [src]="(avatar | async)" (error)="setDefaultAvatar($event)" />
    </div>
  `,
  styleUrls: ['./my-avatar-widget.component.scss']
})
export class MyAvatarWidgetComponent {
  public avatar: Observable<string>;

  constructor(
    private readonly _myProfileStore: MyProfileStore,
    private readonly _configService: ConfigurationService,
    private readonly _routingService: RoutingService,
    private readonly _configurationService: ConfigurationService
  ) { 
    this.avatar = this._myProfileStore.state
      .pipe(map(p => `${this._configService.avatarsBlobStorageUrl}/${p.avatarFileName}`));
  }

  public navigateToMyProfile(): void {
    this._routingService.navigateToMyProfile();
  }

  public setDefaultAvatar(event: any) {
    event.target.src = this._configurationService.defaultAvatarUrl;
  }

}
