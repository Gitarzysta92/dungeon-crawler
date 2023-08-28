import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { routes } from './lobby.routing';
import { LobbyViewComponent } from './components/lobby-view/lobby-view.component';
import { DungeonSharedModule } from '../dungeon/api';
import { NotificationsSharedModule } from '../../aspects/notifications/api';
import { LobbySharedModule } from './lobby.shared-module';
import { RouterModule } from '@angular/router';
import { SoundEffectsModule } from 'src/app/aspects/sound-effects/sound-effects.module';


@NgModule({
  imports: [RouterModule.forChild(routes.bindComponents({
    root: LobbyViewComponent
  }).toDefaultFormat())],
  exports: [RouterModule]
})
class LobbyRoutingModule { }


@NgModule({
  declarations: [
    LobbyViewComponent,
  ],
  imports: [
    SharedModule,
    LobbySharedModule,
    LobbyRoutingModule,
    DungeonSharedModule,
    NotificationsSharedModule,
    SoundEffectsModule
  ],
  providers: [
    
  ],
  exports: [
    LobbyViewComponent
  ]
})
export class LobbyModule {}
