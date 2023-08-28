import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigurationService } from "src/app/infrastructure/configuration/api";
import { IProfileDto } from "../models/profile-dto";

@Injectable({ providedIn: "root" })
export class ProfilesService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _configurationService: ConfigurationService
  ) { }
  
  getProfiles(profileIds: string[]): Observable<IProfileDto[]> {
    const params = new HttpParams()
      .appendAll({ id: profileIds })
    return this._httpClient.get<IProfileDto[]>(this._configurationService.apiUrl + '/profiles', { params: params })
  }

}