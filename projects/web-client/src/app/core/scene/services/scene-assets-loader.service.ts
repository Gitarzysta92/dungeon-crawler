
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
  private _providers: IAssetDefinitionProvider<unknown>[];
  gltfLoader: GLTFLoader;
  textureLoader: TextureLoader;

  constructor(
    private readonly _assetsLoaderService: AssetLoaderService
  ) { 
    this.gltfLoader = new GLTFLoader();
    this.textureLoader = new TextureLoader();
  }

  public aggregateAssetsFor(defs: (ISceneComposerDefinition<unknown> & IDefinitionWithAssets)[]): IAssetDefinition[] {
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
    if (ext === 'glb') {
      console.log(name, ext)
      const result = await this.gltfLoader.loadAsync(`${imagesPath}/${name}.${ext}`);
      return result;
    } else if (ext === 'png' || ext === 'jpg') {
      const result = await this.textureLoader.loadAsync(`${imagesPath}/${name}.${ext}`);
      return result;
    }
  }

  public async loadAsync2(asset: IAssetDefinition): Promise<any> {
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

    return asset;
  }


  public loadAssets(assetDefinitions: IAssetDefinition[]) {
    console.log(assetDefinitions);
  }


}
