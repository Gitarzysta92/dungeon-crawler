import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IMainInitializer } from 'src/app/infrastructure/configuration/models/main-initializer';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { LocalStorageService } from 'src/app/infrastructure/data-store/services/local-storage/local-storage.service';
import { IMyProfileDto } from '../models/my-profile.dto';
import { MyProfileService } from '../services/my-profile/my-profile.service';
import { MyProfileAction } from './actions/actions';

export const myProfileStore = Symbol('my-profile');

@Injectable({ providedIn: 'root'})
export class MyProfileStore implements IMainInitializer {

  public get state() { return this._store.state };
  public get currentState() { return this._store.currentState; }

  private _store: Store<IMyProfileDto>;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _myProfileService: MyProfileService,
    private readonly _localStorageService: LocalStorageService
  ) {}
  
  public update(profile: Partial<IMyProfileDto>): Observable<void> {
    return this._store.dispatch<Partial<IMyProfileDto>>(MyProfileAction.updateMyProfile, profile);
  }

  public updateAvatar(file: File): void {
    this._store.dispatch<File>(MyProfileAction.updateAvatar, file);
  }

  public initialize() {
    this._store = this._storeService.createStore<IMyProfileDto>(myProfileStore, {
      initialState: this._myProfileService.getMyProfile(),
      stateStorage: this._localStorageService,
      actions: { 
        [MyProfileAction.updateMyProfile]: {
          action: (ctx) => this._updateMyProfile(ctx.payload, ctx.initialState),
          after: [
            ctx => this._myProfileService.updateMyProfile(ctx.computedState),
          ]
        },
        [MyProfileAction.updateAvatar]: {
          before: [
            ctx => this._myProfileService.updateMyAvatar(ctx.payload)
              .pipe(tap(n => Object.assign(ctx.custom, { fileName: n }))),
          ],
          action: ctx => this._updateAvatar(ctx.custom.fileName, ctx.initialState),
        }
      } 
    });
  }

  private _updateMyProfile = (p: IMyProfileDto, state: IMyProfileDto): IMyProfileDto => {
    return Object.assign(state, p);
  }

  private _updateAvatar = (fileName: string, state: IMyProfileDto): IMyProfileDto => {
    return Object.assign(state, { avatarFileName: fileName })
  }
}