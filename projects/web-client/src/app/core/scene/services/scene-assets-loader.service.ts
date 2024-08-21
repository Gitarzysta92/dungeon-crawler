
import { IAssetDeclaration, IAssetDefinitionProvider, IAssetsProvider, IDefinitionWithAssets } from '@3d-scene/lib/assets/assets.interface';
import { ISceneComposerDefinition } from '@3d-scene/lib/helpers/scene-composer/scene-composer.interface';
import { Injectable } from '@angular/core';
import { AssetLoaderService } from 'src/app/infrastructure/asset-loader/api';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';

@Injectable({
  providedIn: 'root'
})
export class SceneAssetsLoaderService implements IAssetsProvider {
  gltfLoader: GLTFLoader;
  textureLoader: TextureLoader;

  private _loadedAssets: Map<string, any> = new Map();
  private _providers: IAssetDefinitionProvider<unknown>[] = [];

  constructor(
    private readonly _assetsLoaderService: AssetLoaderService
  ) { 
    this.gltfLoader = new GLTFLoader();
    this.textureLoader = new TextureLoader();
  }

  public async loadAssets(defs: (ISceneComposerDefinition<unknown> & Partial<IDefinitionWithAssets>)[]): Promise<void> {
    const assetDefs = this.aggregateAssetsFor(defs);
    for (let asset of assetDefs) {
      const r = await this._loadAsync(asset);
      this._loadedAssets.set(`${asset.fileName}${asset.ext}`, r);
    }
    console.log("loaded assets:", Array.from(this._loadedAssets.entries()))
  }

  public aggregateAssetsFor(defs: (ISceneComposerDefinition<unknown> & Partial<IDefinitionWithAssets>)[]): IAssetDeclaration[] {
    let ads = [];
    for (let def of defs) {
      const provider = this._providers.find(p => p.definitionName === def.definitionName);
      if (!provider) {
        console.warn(`Provider for ${def.definitionName} not found`);
        continue;
      }
      ads = provider.getRequiredAssetDefinitions(def).concat(ads);
    }
    return ads;
  }

  public registerProviders(ps: IAssetDefinitionProvider<unknown>[]): void {
    this._providers = ps;
  }


  public async loadAsync(asset: IAssetDeclaration): Promise<any> {
    const loadedAsset = this._loadedAssets.get(`${asset.fileName}${asset.ext}`);
    if (!loadedAsset) {
      return this._loadAsync(asset);
    } else {
      return loadedAsset;
    }
  }

  private async _loadAsync(asset: IAssetDeclaration): Promise<any> {
    let result;
    if (asset.ext === 'glb') {
      if (!asset.dir) {
        asset.dir = "/images";
      }
      result = await this.gltfLoader.loadAsync(this._assetsLoaderService.buildUrl(asset));
    } else if (asset.ext === 'png' || asset.ext === 'jpg') {
      if (!asset.dir) {
        asset.dir = "/images";
      }
      result = await this.textureLoader.loadAsync(this._assetsLoaderService.buildUrl(asset));
    }
    if (!asset) {
      throw new Error(`Cannot find asset: ${asset.dir} ${asset.fileName}`)
    }
    return result;
  }

}
