import { AssetLoadingMode, IAssetDeclaration } from "src/app/infrastructure/asset-loader/api";
import { BACKGROUND_SOUND_THEME, ROLLOVER_SOUND } from "./menu-sound-tracks";

export const SOUND_COMMON_ASSETS: IAssetDeclaration[] = [
  {
    id: BACKGROUND_SOUND_THEME,
    assetName: BACKGROUND_SOUND_THEME,
    extensionName: "mp3",
    loadingType: AssetLoadingMode.Lazy,
    sourceUrl: "/audio/background-theme-burning-bright.mp3"
  },
  {
    id: ROLLOVER_SOUND,
    assetName: ROLLOVER_SOUND,
    extensionName: "mp3",
    loadingType: AssetLoadingMode.Preload,
    sourceUrl: "/audio/rollover.mp3"
  }
]
