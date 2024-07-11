
import { IAssetDefinition, IAssetDefinitionProvider, IAssetMetadata, IAssetsProvider, IDefinitionWithAssets } from '@3d-scene/lib/assets/assets.interface';
import { ISceneComposerDefinition } from '@3d-scene/lib/helpers/scene-composer/scene-composer.interface';
import { Injectable } from '@angular/core';
import { AssetLoaderService } from 'src/app/infrastructure/asset-loader/api';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { imagesPath } from '../../game-data/constants/data-feed-commons';
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
      this._loadedAssets.set(`${asset.assetName}${asset.extensionName}`, r);
    }
    console.log("loaded assets:", Array.from(this._loadedAssets.entries()))
  }

  public aggregateAssetsFor(defs: (ISceneComposerDefinition<unknown> & Partial<IDefinitionWithAssets>)[]): IAssetDefinition[] {
    let ads = [];
    for (let def of defs) {
      const provider = this._providers.find(p => p.definitionName === def.definitionName);
      ads = provider.getRequiredAssetDefinitions(def).concat(ads);
    }
    return ads;
  }

  public registerProviders(ps: IAssetDefinitionProvider<unknown>[]): void {
    this._providers = ps;
  }

  public async loadAsync(name: string, ext: string): Promise<any> {
    return this.loadAsync2({ assetName: name, extensionName: ext });
  }

  public async loadAsync2(asset: IAssetDefinition): Promise<any> {
    const loadedAsset = this._loadedAssets.get(`${asset.assetName}${asset.extensionName}`);
    if (!loadedAsset) {
      return this._loadAsync(asset);
    } else {
      return loadedAsset;
    }
  }


  private async _loadAsync(asset: IAssetDefinition): Promise<any> {
    const { assetName, extensionName } = asset;
    let result
    if (extensionName === 'glb') {
      result = await this.gltfLoader.loadAsync(`${imagesPath}/${assetName}.${extensionName}`);
    } else if (extensionName === 'png' || extensionName === 'jpg') {
      result = await this.textureLoader.loadAsync(`${imagesPath}${asset.dir ?? ""}/${assetName}.${extensionName}`);
    }
    if (!asset) {
      throw new Error(`Cannot find asset: ${asset.dir} ${asset.assetName}`)
    }
    return result;
  }

}
