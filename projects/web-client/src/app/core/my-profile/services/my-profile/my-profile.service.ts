import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { IMySettingsDto } from '../../api';
import { IMyProfileDto } from '../../models/my-profile.dto';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  private _endpointPath: string = '/profiles/me'

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService,
  ) { }


  public getMyProfile(): Observable<IMyProfileDto> {
    return of({ 
      id: "",
    } as IMyProfileDto)
  }

  public updateMyProfile(profile: IMyProfileDto): Observable<boolean> {
    return this._httpClient.patch<IMyProfileDto>(this._config.apiUrl + this._endpointPath, profile).pipe(map(result => !!result));
  }

  public updateMySettings(settings: IMySettingsDto): Observable<boolean> {
    return of(true);
    //return this._httpClient.patch<IMySettingsDto>(this._config.apiUrl + this._endpointPath + "settings", settings).pipe(map(result => !!result));
  }

  public updateMyAvatar(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this._httpClient.post(this._config.apiUrl + this._endpointPath + '/avatar', formData, { responseType: 'text' })
  }

  public getMyAvatarUrl(fileName: string): Observable<string> {
    return this._httpClient.get(this._config.avatarsBlobStorageUrl + fileName, { responseType: 'blob'})
      .pipe(map(r => URL.createObjectURL(r)))
  }

}
