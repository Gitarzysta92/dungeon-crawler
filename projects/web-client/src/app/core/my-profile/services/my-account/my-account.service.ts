import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { IMyAccountDto } from '../../models/my-account.dto';


@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  private _endpointPath: string = '/accounts/me'
  token: string;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService,
  ) { }

  public getMyAccount(): Observable<IMyAccountDto> {
    return of({} as IMyAccountDto)
  }

  public updateMyAccount(account: IMyAccountDto): Observable<any> {
    return this._httpClient.patch(this._config.apiUrl + this._endpointPath, account);
  }
}
























