import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { buildGetQuery } from 'src/app/utils/helpers/rest-api.helper';
import { IMyProfileDto } from '../../models/my-profile.dto';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _endpointPath: string = '/profiles'

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService,
  ) { }


  public searchProfile(queryData: { [key: string]: string }): Observable<IMyProfileDto> {
    const query = Object.entries(queryData).reduce((acc, data) => {
      const [ key, value ] = data;
      return `${acc.length > 0 ? '&' + acc : acc }${key}=${value}`
    }, "");
    return this._httpClient.get<IMyProfileDto>(this._config.apiUrl + this._endpointPath + `?${query}`);
  }

  public isProfileExists(queryData: { id?: string; nickname?: string; email?: string}): Observable<boolean> {
    const query = buildGetQuery(queryData);
    return this._httpClient.get<boolean>(this._config.apiUrl + this._endpointPath + `/exists?${query}`);
  }
}
