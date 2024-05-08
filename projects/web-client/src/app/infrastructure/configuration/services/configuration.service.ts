import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  
  public get isProduction() { return environment.production }

  public get assetsStorage() { return  environment.assetsStorage }

  public get defaultAvatarUrl() { return 'assets/images/avatar.png' }

  public get version() { return environment.version }

  public get majorVersion() { return environment.version.split('.')[0] }

  public get versionName() { return environment.versionName }

  constructor() { }
}
