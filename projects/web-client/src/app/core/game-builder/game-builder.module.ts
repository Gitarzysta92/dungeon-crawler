import { NgModule } from '@angular/core';
import { GameBuilderViewComponent } from './components/game-builder-view/game-builder-view.component';
import { GameBuilderRoutingModule } from './game-builder.routing-module';
import { NavigationModule } from 'src/app/aspects/navigation/navigation.module';
import { SoundEffectsModule } from 'src/app/aspects/sound-effects/sound-effects.module';
import { ViewTemplatesModule } from 'src/app/infrastructure/view-templates/view-templates.module';
import { MyProfileSharedModule } from '../my-profile/my-profile.shared-module';
import { GameBuilderStateStore } from './stores/game-builder-state.store';
import { GameBuilderStateService } from './services/game-builder-state.service';
import { GameBuilderResolver } from './resolvers/game-builder.resolver';



@NgModule({
  declarations: [
    GameBuilderViewComponent
  ],
  imports: [
    ViewTemplatesModule,
    NavigationModule,
    MyProfileSharedModule,
    SoundEffectsModule,
    GameBuilderRoutingModule
  ],
  providers: [
    GameBuilderResolver,
    GameBuilderStateStore,
    GameBuilderStateService
  ]
})
export class GameBuilderModule { }
