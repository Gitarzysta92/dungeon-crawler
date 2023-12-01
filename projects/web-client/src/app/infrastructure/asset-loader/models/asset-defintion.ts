import { AssetLoadingMode } from "../constants/asset-loading-mode.enum";

export interface IAssetDefinition {
  key: string;
  loadingType: AssetLoadingMode;
  sourceUrl: string;
}