import { ISceneComposerDefinition } from "../helpers/scene-composer/scene-composer.interface";

export interface IAssetDefinition {
  assetName: string;
  extensionName: string;
  dir?: string;
}

export interface IAssetMetadata {
  
}

export type IDefinitionWithAssets = { [key: symbol | string]: IAssetDefinition };

export interface IAssetDefinitionProvider<T> {
  definitionName: T;
  getRequiredAssetDefinitions: (def: IDefinitionWithAssets) => IAssetDefinition[]
}


export interface IAssetsProvider {
  loadAsync: (arg0: string, arg1: string, metadata?: IAssetMetadata) => any;
  loadAsync2: (asset: IAssetDefinition) => any;
  registerProviders: (ps: IAssetDefinitionProvider<unknown>[]) => void;
  aggregateAssetsFor: (defs: ISceneComposerDefinition<unknown>[]) => IAssetDefinition[];
}