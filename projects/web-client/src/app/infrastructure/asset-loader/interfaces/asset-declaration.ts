import { AssetLoadingMode } from "../constants/asset-loading-mode.enum";

export interface IAssetDeclaration {
  fileName: string;
  ext: string;
  assetName?: string;
  id?: string;
  loadingType?: AssetLoadingMode;
  type?: number;
  dir?: string;
}