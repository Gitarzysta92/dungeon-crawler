import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IMainInitializer } from 'src/app/infrastructure/configuration/models/main-initializer';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { AuthenticationService } from '../../identity/api';
import { IMyAccountDto } from '../models/my-account.dto';
import { MyAccountService } from '../services/my-account/my-account.service';
import { MyAccountAction } from './actions/actions';


@Injectable({ providedIn: 'root'})
export class MyAccountStore implements IMainInitializer  {

  public get state() { return this._store.state };
  public get currentState() { return this._store.currentState };

  private _store: Store<IMyAccountDto>;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _myAccountService: MyAccountService,
    private readonly _authenticationService: AuthenticationService
  ) { }


  public update(profile: Partial<IMyAccountDto>): Observable<void> {
    return this._store.dispatch<Partial<IMyAccountDto>>(MyAccountAction.updateMyAccount, profile);
  }

  public initialize(): void {
    this._store = this._storeService.createStore<IMyAccountDto>(Symbol('my-account'), {
      initialState: this._myAccountService.getMyAccount().pipe(catchError(() => of({} as IMyAccountDto))),
      actions: { 
        [MyAccountAction.updateMyAccount]: {
          before: [ctx => this._myAccountService.updateMyAccount(ctx.payload)], 
          action: ctx => this._updateAccount(ctx.payload, ctx.initialState),
          after: [() => this._authenticationService.refreshToken()]
        },
      } 
    });
  }

  private _updateAccount = (a: IMyAccountDto, state: IMyAccountDto): IMyAccountDto => {
    a.createdAt = state.createdAt;
    a.password = null;
    return Object.assign(state, a);
  }
}