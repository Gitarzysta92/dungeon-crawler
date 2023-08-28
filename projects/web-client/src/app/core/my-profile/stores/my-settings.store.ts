import { Inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { NotificationAction, notificationsStore } from 'src/app/aspects/notifications/api';
import { SoundEffectsService } from 'src/app/aspects/sound-effects/api';
import { IMainInitializer } from 'src/app/infrastructure/configuration/models/main-initializer';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { DEFAULT_SETTINGS } from '../constants/default-settings';
import { MyProfileNotifications, MyProfileNotificationsToken } from '../constants/my-profile-notifications';
import { MUSIC, SOUND_EFFECTS } from '../constants/sound-group-keys';
import { IMySettingsDto } from '../models/my-settings.dto';
import { MyProfileService } from '../services/my-profile/my-profile.service';
import { MySettingsAction } from './actions/actions';

export const mySettings = Symbol('my-settings');

@Injectable({ providedIn: 'root'})
export class MySettingsStore implements IMainInitializer {

  public get state() { return this._store.state };
  public get currentState() { return this._store.currentState; }

  private _store: Store<IMySettingsDto>;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _soundEffectsService: SoundEffectsService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _myProfileService: MyProfileService,
    @Inject(MyProfileNotificationsToken) private readonly _notifications: MyProfileNotifications,
  ) {}
  
  public toggleSound(): Observable<void> {
    return this._store.dispatch(MySettingsAction.toggleSoundMute);
  }

  public changeMusicVolume(volume: number): void {
    this._store.dispatch(MySettingsAction.changeMusicVolume, volume);
  }

  public changeSoundEffectsVolume(volume: number): void {
    this._store.dispatch(MySettingsAction.changeSoundEffectsVolume, volume);
  }

  public initialize() {
    this._store = this._storeService.createStore<IMySettingsDto>(mySettings, {
      initialState: of(DEFAULT_SETTINGS),
      stateStorage: this._localStorageService,
      actions: { 
        [MySettingsAction.toggleSoundMute]: {
          action: ctx => this._toggleSound(ctx.initialState),
          after: [
            ctx => ctx.computedState.sound.isMuted ?
              this._soundEffectsService.mute() :
              this._soundEffectsService.unmuteByGroup({
                [MUSIC]: ctx.computedState.sound.musicVolume,
                [SOUND_EFFECTS]: ctx.computedState.sound.soundEffectsVolume
              }),
            ctx => this._myProfileService.updateMySettings(ctx.computedState)
              .pipe(tap({ error: () => this._storeService.getStore(notificationsStore).dispatch(NotificationAction.add, this._notifications.updateFailed) })),
            () => this._storeService.getStore(notificationsStore).dispatch(NotificationAction.add, this._notifications.updateSuceed)
          ],
        },
        [MySettingsAction.changeMusicVolume]: {
          action: ctx => this._changeMusicVolume(ctx.payload, ctx.initialState),
          after: [
            ctx => this._soundEffectsService.setVolumeByGroup(MUSIC, ctx.computedState.sound.musicVolume),
            ctx => this._myProfileService.updateMySettings(ctx.computedState)
              .pipe(tap({ error: () => this._storeService.getStore(notificationsStore).dispatch(NotificationAction.add, this._notifications.updateFailed) })),
            () => this._storeService.getStore(notificationsStore).dispatch(NotificationAction.add, this._notifications.updateSuceed) 
          ],
        },
        [MySettingsAction.changeSoundEffectsVolume]: {
          action: ctx => this._changeSoundEffectsVolume(ctx.payload, ctx.initialState),
          after: [
            ctx => this._soundEffectsService.setVolumeByGroup(SOUND_EFFECTS, ctx.computedState.sound.soundEffectsVolume),
            ctx => this._myProfileService.updateMySettings(ctx.computedState)
              .pipe(tap({ error: () => this._storeService.getStore(notificationsStore).dispatch(NotificationAction.add, this._notifications.updateFailed) })),
            () => this._storeService.getStore(notificationsStore).dispatch(NotificationAction.add, this._notifications.updateSuceed) 
          ],
        }
      } 
    });
  }

  private _toggleSound = (state: IMySettingsDto): IMySettingsDto => {
    Object.assign(state.sound, { isMuted: !state.sound.isMuted });
    return state;
  }

  private _changeMusicVolume = (volume: number, state: IMySettingsDto): IMySettingsDto => {
    Object.assign(state.sound, { musicVolume: volume } );
    return state;
  }

  private _changeSoundEffectsVolume = (volume: number, state: IMySettingsDto): IMySettingsDto => {
    Object.assign(state.sound, { soundEffectsVolume: volume } );
    return state
  }
}