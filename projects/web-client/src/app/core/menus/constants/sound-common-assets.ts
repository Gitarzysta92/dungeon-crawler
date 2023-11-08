import { AssetLoadingMode } from "src/app/infrastructure/asset-loader/api";
import { BACKGROUND_SOUND_THEME, ROLLOVER_SOUND } from "./common-sound-keys";

export const SOUND_COMMON_ASSETS = [
  {
    key: BACKGROUND_SOUND_THEME,
    loadingType: AssetLoadingMode.Lazy,
    sourceUrl: "/audio/background-theme-burning-bright.mp3"
  },
  {
    key: ROLLOVER_SOUND,
    loadingType: AssetLoadingMode.Preload,
    sourceUrl: "/audio/rollover.mp3"
  }
]
