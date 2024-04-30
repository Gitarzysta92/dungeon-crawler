import { ModuleWithProviders, NgModule } from '@angular/core';
import { GamePersistenceRoutingModule } from './game-persistence.routing-module';
import { ViewTemplatesModule } from 'src/app/infrastructure/view-templates/view-templates.module';
import { NavigationModule } from 'src/app/aspects/navigation/navigation.module';
import { SoundEffectsModule } from 'src/app/aspects/sound-effects/sound-effects.module';
import { GameLoaderComponent } from './components/game-loader/game-loader.component';
import { MAIN_INITIALIZE } from 'src/app/infrastructure/configuration/api';
import { GameSavesStore } from './stores/game-saves.store';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameLoadingService } from './services/game-loading.service';



@NgModule({
  declarations: [GameLoaderComponent],
  imports: [
    SharedModule,
    ViewTemplatesModule,
    NavigationModule,
    SoundEffectsModule,
    GamePersistenceRoutingModule,
    TranslateModule.forChild({ extend: true }),
  ]
})
export class GamePersistenceModule { 
  static forRoot(): ModuleWithProviders<GamePersistenceModule> {
    return {
      ngModule: GamePersistenceModule,
      providers: [
        GameSavesStore,
        { provide: MAIN_INITIALIZE, useExisting: GameSavesStore, multi: true },
        { provide: MAIN_INITIALIZE, useExisting: GameLoadingService, multi: true }
      ]
    };
  }
}
