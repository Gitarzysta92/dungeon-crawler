import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigurationService } from '../../infrastructure/configuration/services/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class BlobService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _configService: ConfigurationService,
  ) { }

  public getBlobAsObjectUrl(containerName: string = '', fileName: string = ''): Observable<any> {
    return this._httpClient.get(`https://hexchessstorage.blob.core.windows.net/avatars/Screenshot%202023-02-23%20at%2012.53.06.png`, { responseType: 'blob' })
      .pipe(map(r => URL.createObjectURL(r)));

    return this._httpClient.get(`${this._configService.blobStorageUrl}/${containerName}/${fileName}`, { responseType: 'blob' })
      .pipe(map(r => URL.createObjectURL(r)));
  }
}
