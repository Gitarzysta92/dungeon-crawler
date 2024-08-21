import { IAssetDeclaration } from "src/app/infrastructure/asset-loader/api";

export interface IUiMedium {
  uiData: IUiData,
  isUiMedium: true
}



export type IUiData = { [key: string]: IAssetDeclaration | string | number }