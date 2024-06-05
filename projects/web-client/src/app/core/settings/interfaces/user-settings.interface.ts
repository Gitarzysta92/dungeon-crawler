export interface IUserSettings {
  languageCode: string;
  sound: {
    isMuted: boolean;
    musicVolume: number;
    soundEffectsVolume: number;
  }
  interface: {
    isInteractionAllowed: boolean
  }
}