import { NgModule } from '@angular/core';
import { GamePersistenceRoutingModule } from './game-persistence.routing-module';
import { ViewTemplatesModule } from 'src/app/infrastructure/view-templates/view-templates.module';
import { NavigationModule } from 'src/app/aspects/navigation/navigation.module';
import { SoundEffectsModule } from 'src/app/aspects/sound-effects/sound-effects.module';
import { GameLoaderComponent } from './components/game-loader/game-loader.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssetsLoaderModule } from 'src/app/infrastructure/asset-loader/asset-loader.module';
import { GameUiSharedModule } from '../game-ui/game-ui.shared-module';
import { NgScrollbarModule } from 'ngx-scrollbar';



@NgModule({
  declarations: [
    GameLoaderComponent
  ],
  imports: [
    SharedModule,
    ViewTemplatesModule,
    NavigationModule,
    SoundEffectsModule,
    GamePersistenceRoutingModule,
    TranslateModule.forChild({ extend: true }),
    AssetsLoaderModule,
    GameUiSharedModule,
    NgScrollbarModule,
  ]
})
export class GamePersistenceModule { }
