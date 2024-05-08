import { Injectable } from '@angular/core';
import { debounceTime, first, firstValueFrom, of } from 'rxjs';
import { SoundEffectsService } from 'src/app/aspects/sound-effects/api';
import { IInitializable } from 'src/app/infrastructure/configuration/interfaces/initializable.interface';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-storage/api';
import { DEFAULT_SETTINGS } from '../constants/default-settings';
import { MUSIC, SOUND_EFFECTS } from '../constants/sound-group-keys';
import { TranslateService } from '@ngx-translate/core';
import { IUserSettings } from '../interfaces/user-settings.interface';

export namespace SettingsAction {
  export const changeLanguage = Symbol('changeLanguage');
  export const toggleSoundMute = Symbol('toggleSoundMute');
  export const changeMusicVolume = Symbol('changeMusicVolume');
  export const changeSoundEffectsVolume = Symbol('changeSoundEffectsVolume');
}


export const mySettings = Symbol('my-settings');

@Injectable({ providedIn: 'root'})
export class SettingsStore implements IInitializable {

  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; }

  private _store: Store<IUserSettings>;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _soundEffectsService: SoundEffectsService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _translateService: TranslateService
  ) { }
  
  public changeLanguage(langCode: string): Promise<void> {
    return this._store.dispatch(SettingsAction.changeLanguage, langCode);
  }
  
  public toggleSound(): Promise<void> {
    return this._store.dispatch(SettingsAction.toggleSoundMute);
  }

  public changeMusicVolume(volume: number): void {
    this._store.dispatch(SettingsAction.changeMusicVolume, volume);
  }

  public changeSoundEffectsVolume(volume: number): void {
    this._store.dispatch(SettingsAction.changeSoundEffectsVolume, volume);
  }

  public initialize(): Promise<unknown> {
    this._store = this._storeService.createStore<IUserSettings>(mySettings, {
      initialState: DEFAULT_SETTINGS,
      stateStorage: this._localStorageService,
      actions: {
        [SettingsAction.changeLanguage]: {
          action: ctx => this._changeLanguage(ctx.payload, ctx.initialState),
          after: [ ctx => this._translateService.use(ctx.computedState.languageCode) ],
        },
        [SettingsAction.toggleSoundMute]: {
          action: ctx => this._toggleSound(ctx.initialState),
          after: [
            ctx => ctx.computedState.sound.isMuted ?
              this._soundEffectsService.mute() :
              this._soundEffectsService.unmuteByGroup({
                [MUSIC]: ctx.computedState.sound.musicVolume,
                [SOUND_EFFECTS]: ctx.computedState.sound.soundEffectsVolume
              })
          ],
        },
        [SettingsAction.changeMusicVolume]: {
          action: ctx => this._changeMusicVolume(ctx.payload, ctx.initialState),
          after: [
            ctx => this._soundEffectsService.setVolumeByGroup(MUSIC, ctx.computedState.sound.musicVolume),
          ],
        },
        [SettingsAction.changeSoundEffectsVolume]: {
          action: ctx => this._changeSoundEffectsVolume(ctx.payload, ctx.initialState),
          after: [
            ctx => this._soundEffectsService.setVolumeByGroup(SOUND_EFFECTS, ctx.computedState.sound.soundEffectsVolume),
          ],
        }
      } 
    });

    this._store.state
      .pipe(debounceTime(100), first())
      .subscribe(s => {
        this._translateService.use(s.languageCode);
        this._soundEffectsService.setVolumeByGroup(MUSIC, s.sound.musicVolume);
        this._soundEffectsService.setVolumeByGroup(SOUND_EFFECTS, s.sound.soundEffectsVolume);
      })
    return firstValueFrom(this._store.state.pipe(debounceTime(100), first()))
  }

  private _toggleSound = (state: IUserSettings): IUserSettings => {
    Object.assign(state.sound, { isMuted: !state.sound.isMuted });
    return state;
  }

  private _changeLanguage = (languageCode: number, state: IUserSettings): IUserSettings => {
    Object.assign(state, { languageCode });
    return state;
  }

  private _changeMusicVolume = (volume: number, state: IUserSettings): IUserSettings => {
    Object.assign(state.sound, { musicVolume: volume } );
    return state;
  }

  private _changeSoundEffectsVolume = (volume: number, state: IUserSettings): IUserSettings => {
    Object.assign(state.sound, { soundEffectsVolume: volume } );
    return state
  }
}