import { IUserSettings } from "../interfaces/user-settings.interface";


export const DEFAULT_SETTINGS: IUserSettings = {
  languageCode: "pl",
  sound: {
    isMuted: false,
    musicVolume: 50,
    soundEffectsVolume: 50
  }
} 