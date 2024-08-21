import { ISceneComposerDefinition } from "../helpers/scene-composer/scene-composer.interface";

export interface IAssetDeclaration {
  fileName: string;
  ext: string;
  dir?: string;
}

export interface IAssetMetadata {
  
}

export type IDefinitionWithAssets = { [key: symbol | string]: IAssetDeclaration };

export interface IAssetDefinitionProvider<T> {
  definitionName: T;
  getRequiredAssetDefinitions: (def: IDefinitionWithAssets) => IAssetDeclaration[]
}


export interface IAssetsProvider {
  loadAsync: (asset: IAssetDeclaration) => any;
  registerProviders: (ps: IAssetDefinitionProvider<unknown>[]) => void;
  aggregateAssetsFor: (defs: ISceneComposerDefinition<unknown>[]) => IAssetDeclaration[];
}