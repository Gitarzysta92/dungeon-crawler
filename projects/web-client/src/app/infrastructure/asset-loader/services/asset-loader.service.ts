import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, mergeMap, Observable, of, switchMap, tap } from "rxjs";
import { ConfigurationService } from "../../configuration/api";
import { IndexedDbService } from "../../data-store/api";
import { AssetLoadingMode, IAssetDefinition } from "../api";

@Injectable({ providedIn: 'root' })
export class AssetLoaderService {

  private _lazyLoaded: IAssetDefinition[] = [];
  private _customHeaders: HttpHeaders;

  constructor(
    private readonly _indexedDbService: IndexedDbService,
    private readonly _httpClient: HttpClient,
    private readonly _configurationService: ConfigurationService
  ) { 
    this._customHeaders = new HttpHeaders().append("Authorization", "skip")
  }

  public loadAssets(definitions: IAssetDefinition[]): Observable<any> {
    this._lazyLoaded = this._lazyLoaded.concat(definitions.filter(d => d.loadingType === AssetLoadingMode.Lazy));

    return from(definitions.filter(d => d.loadingType === AssetLoadingMode.Preload))
      .pipe(
        mergeMap(d =>
          this._httpClient.get(this._configurationService.blobStorageUrl + d.sourceUrl, { responseType: "blob", headers: this._customHeaders })
            .pipe(tap(r => this._indexedDbService.createOrUpdate(d.key, r))))
      )
  }

  public getAsset(assetKey: string): Observable<any> {
    const definition = this._lazyLoaded.find(d => d.key === assetKey);

    return this._indexedDbService.read(assetKey)
      .pipe(
        switchMap(v => v == null && !!definition ?
          this._httpClient.get(this._configurationService.blobStorageUrl + definition.sourceUrl, { responseType: "blob", headers: this._customHeaders })
            .pipe(tap(r => {
              this._indexedDbService.createOrUpdate(definition.key, r);
              this._lazyLoaded = this._lazyLoaded.filter(d => d !== definition);
            })) : of(v)),
      )
  }
}