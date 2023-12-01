export namespace MyProfileAction {
  export const updateMyProfile = Symbol('updateProfile');
  export const updateAvatar = Symbol('updateAvatar');
}

export namespace MyAccountAction {
  export const updateMyAccount = Symbol('updateMyAccount');
}

export namespace MySettingsAction {
  export const toggleSoundMute = Symbol('toggleSoundMute');
  export const changeMusicVolume = Symbol('changeMusicVolume');
  export const changeSoundEffectsVolume = Symbol('changeSoundEffectsVolume');
}