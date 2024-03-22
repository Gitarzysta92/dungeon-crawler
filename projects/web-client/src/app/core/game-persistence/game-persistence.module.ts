import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePersistenceRoutingModule } from './game-persistence.routing-module';
import { ViewTemplatesModule } from 'src/app/infrastructure/view-templates/view-templates.module';
import { NavigationModule } from 'src/app/aspects/navigation/navigation.module';
import { SoundEffectsModule } from 'src/app/aspects/sound-effects/sound-effects.module';
import { MyProfileSharedModule } from '../my-profile/my-profile.shared-module';
import { GameLoaderComponent } from './components/game-loader/game-loader.component';



@NgModule({
  declarations: [GameLoaderComponent],
  imports: [
    ViewTemplatesModule,
    NavigationModule,
    MyProfileSharedModule,
    SoundEffectsModule,
    GamePersistenceRoutingModule
  ]
})
export class GamePersistenceModule { }
