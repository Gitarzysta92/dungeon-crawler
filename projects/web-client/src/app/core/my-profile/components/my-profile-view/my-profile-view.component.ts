import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, delay, finalize, takeUntil } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { slideIn } from 'src/app/shared/animations/predefined-animations';
import { AccountValidators } from 'src/app/shared/forms/validators/account.validator';
import { ProfileValidators } from 'src/app/shared/forms/validators/unique-profile.validator';
import { IMyAccountDto } from '../../models/my-account.dto';
import { IMyProfileDto } from '../../models/my-profile.dto';
import { IMySettingsDto } from '../../models/my-settings.dto';
import { MyAccountStore } from '../../stores/my-account.store';
import { MyProfileStore } from '../../stores/my-profile.store';
import { MySettingsStore } from '../../stores/my-settings.store';
import { IntegratedInputComponent } from '../integrated-input/integrated-input.component';

@Component({
  selector: 'app-my-profile-view',
  templateUrl: './my-profile-view.component.html',
  styleUrls: ['./my-profile-view.component.scss'],
  providers: [ ProfileValidators, AccountValidators ],
  animations: [
    slideIn('slideIn')
  ]
})
export class MyProfileViewComponent implements OnInit, OnDestroy {

  public profile: IMyProfileDto;
  public account: IMyAccountDto;
  public avatarUrl: string | undefined;

  public settings: IMySettingsDto;

  private _destroyed: Subject<void> = new Subject();

  constructor(
    private readonly _myProfileStore: MyProfileStore,
    private readonly _myAccountStore: MyAccountStore,
    public mySettingsStore: MySettingsStore,
    private readonly _configurationService: ConfigurationService,
    private readonly _changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void { 
    this._myProfileStore.state
      .pipe(takeUntil(this._destroyed))
      .subscribe(profile => {
        this.profile = profile
        this.avatarUrl = !!profile.avatarFileName ?
          this._configurationService.avatarsBlobStorageUrl + '/' + profile.avatarFileName :
          this._configurationService.defaultAvatarUrl;
      });
  
    this._myAccountStore.state
      .pipe(takeUntil(this._destroyed))
      .subscribe(account => { 
        this.account = account;
        this._changeDetector.markForCheck();
      });
    
    this.mySettingsStore.state
      .pipe(takeUntil(this._destroyed))
      .subscribe(settings => { 
        this.settings = settings;
        this._changeDetector.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public updateAccount(account: Partial<IMyAccountDto>, input?: IntegratedInputComponent): void {
    this._myAccountStore.update(account)
      .pipe(
        delay(2000),
        catchError(err => {
          input?.setFailureState();
          return throwError(err);
        }),
        finalize(() => input?.setSuccessState())
      )
      .subscribe()
  }

  public updateProfile(nickname: string, input?: IntegratedInputComponent): void {
    const newProfile = Object.assign({}, this.profile);
    newProfile.nickname = nickname;

    this._myProfileStore.update(newProfile)
      .pipe(delay(2000))
      .subscribe(
        () => input?.setSuccessState(), 
        () => input?.setFailureState()
      )
  }

  public updateAvatar(file: File): void {
    this._myProfileStore.updateAvatar(file);
  }
}
