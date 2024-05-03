import { NgModule } from '@angular/core';
import { GameBuilderViewComponent } from './components/game-builder-view/game-builder-view.component';
import { GameBuilderRoutingModule } from './game-builder.routing-module';
import { NavigationModule } from 'src/app/aspects/navigation/navigation.module';
import { SoundEffectsModule } from 'src/app/aspects/sound-effects/sound-effects.module';
import { ViewTemplatesModule } from 'src/app/infrastructure/view-templates/view-templates.module';
import { GameBuilderStateStore } from './stores/game-builder-state.store';
import { GameBuilderStateService } from './services/game-builder-state.service';
import { TranslateModule } from '@ngx-translate/core';
import { RacePickerComponent } from './components/race-picker/race-picker.component';
import { ClassPickerComponent } from './components/class-picker/class-picker.component';
import { OriginPickerComponent } from './components/origin-picker/origin-picker.component';
import { IdentityPickerComponent } from './components/identity-picker/identity-picker.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssetsLoaderModule } from 'src/app/infrastructure/asset-loader/asset-loader.module';
import { BuilderStepGuard } from './guards/builder-step.guard';
import { BuilderGuard } from './guards/builder.guard';
import { GameBuilderService } from './services/game-builder.service';
import { OverlayModule } from '@angular/cdk/overlay';



@NgModule({
  declarations: [
    GameBuilderViewComponent,
    RacePickerComponent,
    ClassPickerComponent,
    OriginPickerComponent,
    IdentityPickerComponent,
  ],
  imports: [
    SharedModule,
    ViewTemplatesModule,
    NavigationModule,
    SoundEffectsModule,
    GameBuilderRoutingModule,
    TranslateModule.forChild({ extend: true }),
    AssetsLoaderModule,
    OverlayModule
  ],
  providers: [
    GameBuilderStateStore,
    GameBuilderStateService,
    BuilderStepGuard,
    BuilderGuard,
    GameBuilderService
  ]
})
export class GameBuilderModule { }
