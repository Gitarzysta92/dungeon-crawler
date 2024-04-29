import { ISettingsDto } from "../interfaces/my-settings.dto";

export const DEFAULT_SETTINGS: ISettingsDto = {
  languageCode: "pl",
  sound: {
    isMuted: false,
    musicVolume: 50,
    soundEffectsVolume: 50
  }
} 