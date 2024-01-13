import { ISceneComposerDefinition } from "../helpers/scene-composer/scene-composer.interface";

export interface IAssetDefinition {
  assetName: string;
  extensionName: string;
}

export type IDefinitionWithAssets = { [key: symbol | string]: IAssetDefinition };

export interface IAssetDefinitionProvider<T> {
  definitionName: T;
  getRequiredAssetDefinitions: (def: IDefinitionWithAssets) => IAssetDefinition[]
}


export interface IAssetsProvider {
  loadAsync: (arg0: string, arg1: string) => any;
  registerProviders: (ps: IAssetDefinitionProvider<unknown>[]) => void;
  aggregateAssetsFor: (defs: ISceneComposerDefinition<unknown>[]) => IAssetDefinition[];
}