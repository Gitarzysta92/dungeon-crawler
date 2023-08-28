import { Directive, HostListener } from '@angular/core';
import { ROLLOVER_SOUND } from 'src/app/core/main/api';
import { IMySettingsDto, mySettings } from 'src/app/core/my-profile/api';
import { StoreService } from 'src/app/infrastructure/data-store/api';
import { SoundEffectsService } from '../../api';

@Directive({
  selector: '[soundEffectTrigger]'
})
export class SoundEffectTriggerDirective {

  constructor(
    private readonly _soundEffectsService: SoundEffectsService,
    private readonly _storeService: StoreService
  ) { }

  @HostListener('mouseenter')
  private _onMouseEnter(): void {
    const settings = this._storeService.getStore<IMySettingsDto>(mySettings)?.currentState;
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
