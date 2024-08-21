import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, mergeMap, Observable, of, switchMap, tap } from "rxjs";
import { ConfigurationService } from "../../configuration/api";
import { IndexedDbService } from "../../data-storage/api";
import { AssetLoadingMode, IAssetDeclaration } from "../api";
import { AssetType } from "src/app/core/game-ui/constants/asset-type";

@Injectable({ providedIn: 'root' })
export class AssetLoaderService {

  private _lazyLoaded: IAssetDeclaration[] = [];
  private _customHeaders: HttpHeaders;

  constructor(
    private readonly _indexedDbService: IndexedDbService,
    private readonly _httpClient: HttpClient,
    private readonly _configurationService: ConfigurationService
  ) { 
    this._customHeaders = new HttpHeaders().append("Authorization", "skip");
  }

  public preloadAssets(definitions: IAssetDeclaration[]): Observable<any> {
    this._lazyLoaded = this._lazyLoaded.concat(definitions.filter(d => d.loadingType === AssetLoadingMode.Lazy));

    return from(definitions.filter(d => d.loadingType === AssetLoadingMode.Preload))
      .pipe(
        mergeMap(d =>
          this._httpClient.get(this.buildUrl(d), { responseType: "blob", headers: this._customHeaders })
            .pipe(tap(r => this._indexedDbService.createOrUpdate(d.assetName, r))))
      )
  }

  public getAsset(assetKey: string): Observable<any> {
    const definition = this._lazyLoaded.find(d => d.assetName === assetKey);
    return from(this._indexedDbService.read(assetKey))
      .pipe(
        switchMap(v => v == null && !!definition ?
          this._httpClient.get(this.buildUrl(definition), { responseType: "blob", headers: this._customHeaders })
            .pipe(tap(r => {
              this._indexedDbService.createOrUpdate(definition.assetName, r);
              this._lazyLoaded = this._lazyLoaded.filter(d => d !== definition);
            })) : of(v)),
      )
  }

  public buildUrl(a: IAssetDeclaration): string {
    let path = "";

    if (a?.type === AssetType.Avatar) {
      path = "/images/avatar"
    }
    if (a?.type === AssetType.Portrait) {
      path = "/images/portrait"
    }

    if (a?.type === AssetType.TileTexture) {
      path = "/images/avatar"
    }

    if (a.dir && !path) {
      path = a.dir
    }

    return this._configurationService.assetsStorage + `${path}/${a.fileName}.${a.ext}`;
  }

 
}