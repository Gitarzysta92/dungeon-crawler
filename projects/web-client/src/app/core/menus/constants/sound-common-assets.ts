import { AssetLoadingMode, IAssetDeclaration } from "src/app/infrastructure/asset-loader/api";
import { BACKGROUND_SOUND_THEME, ROLLOVER_SOUND } from "./menu-sound-tracks";

export const SOUND_COMMON_ASSETS: IAssetDeclaration[] = [
  {
    id: BACKGROUND_SOUND_THEME,
    assetName: BACKGROUND_SOUND_THEME,
    loadingType: AssetLoadingMode.Lazy,
    fileName: "background-theme-burning-bright",
    ext: "mp3",
    dir: "/audio"
  },
  {
    id: ROLLOVER_SOUND,
    assetName: ROLLOVER_SOUND,
    loadingType: AssetLoadingMode.Preload,
    fileName: "rollover",
    ext: "mp3",
    dir: "/audio"
  }
]
