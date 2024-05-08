import { Directive, HostListener } from '@angular/core';

import { StoreService } from 'src/app/infrastructure/data-storage/api';
import { SoundEffectsService } from '../../../../aspects/sound-effects/api';
import { ROLLOVER_SOUND } from 'src/app/core/menus/api';
import { mySettings } from 'src/app/core/settings/stores/settings.store';
import { IUserSettings } from 'src/app/core/settings/interfaces/user-settings.interface';

@Directive({
  selector: '[rolloverSound]'
})
export class RolloverSoundDirective {

  constructor(
    private readonly _soundEffectsService: SoundEffectsService,
    private readonly _storeService: StoreService
  ) {}

  @HostListener('mouseenter')
  private _onMouseEnter(): void {
    const settings = this._storeService.getStore<IUserSettings>(mySettings)?.currentState;

    if (!settings) {
      return;
    }
    this._soundEffectsService.play(
      ROLLOVER_SOUND,
      settings.sound.soundEffectsVolume,
      settings.sound.isMuted
    );
  }

}
