export interface ISettingsDto {
  languageCode: string;
  sound: {
    isMuted: boolean;
    musicVolume: number;
    soundEffectsVolume: number;
  } 
}