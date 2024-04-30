import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  
  public get apiUrl() { return environment.apiUrl }

  public get isProduction() { return environment.production }

  public get blobStorageUrl() { return  environment.blobStorageUrl }

  public get avatarsContainerName() { return environment.avatarsContainerName }

  public get avatarsBlobStorageUrl() { return `${environment.blobStorageUrl}/${environment.avatarsContainerName}` }

  public get selectedArmiesLimit() { return environment.selectedArmyFallbacksLimit || 0 }

  public get defaultAvatarUrl() { return 'assets/images/avatar.png' }

  public get version() { return environment.version }

  public get majorVersion() { return environment.version.split('.')[0] }

  public get versionName() { return environment.versionName }

  constructor() { }
}
