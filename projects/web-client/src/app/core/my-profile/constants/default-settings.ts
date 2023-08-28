import { IMySettingsDto } from "../models/my-settings.dto";

export const DEFAULT_SETTINGS: IMySettingsDto = {
  sound: {
    isMuted: false,
    musicVolume: 50,
    soundEffectsVolume: 50
  }
} 