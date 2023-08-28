import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildGetQuery } from 'src/app/utils/helpers/rest-api.helper';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { IRegistrationDto } from '../../models/registration.dto';
import { ICredentialsDto } from '../../models/credentials.dto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService,
  ) { }

  public register(data: IRegistrationDto) {
    return this._httpClient.post(this._config.apiUrl + '/accounts', data, { responseType: "text" });
  }

  public isAccountExists(queryData: any): Observable<boolean> {
    const query = buildGetQuery(queryData);
    return this._httpClient.get<boolean>(this._config.apiUrl + `/accounts/exists?${query}`);
  }

  public sendRecoveryLink(email: string): Observable<unknown> {
    return this._httpClient.post(this._config.apiUrl + '/accounts/password/reset', { email });
  }

  public resetPassword(token: string, credentials: ICredentialsDto): Observable<unknown> {
    return this._httpClient.patch(this._config.apiUrl + `/accounts/password/reset/${token}`, credentials)
  }

}