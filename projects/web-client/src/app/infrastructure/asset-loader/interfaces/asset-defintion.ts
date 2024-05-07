import { AssetLoadingMode } from "../constants/asset-loading-mode.enum";

export interface IAssetDeclaration {
  id: string;
  assetName: string;
  extensionName: string;
  loadingType: AssetLoadingMode;
  dir?: string;
  sourceUrl: string;
}

export interface IPlainAssetDefinition {
  url: string;
}