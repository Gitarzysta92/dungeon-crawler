import { ModuleWithProviders, NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameExitConfirmationModalComponent } from "./components/game-exit-confirmation-modal/game-exit-confirmation-modal.component";
import { GameMenuComponent } from "./components/game-menu/game-menu.component";
import { INITIALIZE } from "src/app/infrastructure/configuration/api";
import { AssetLoaderService } from "src/app/infrastructure/asset-loader/api";
import { firstValueFrom } from "rxjs";
import { SOUND_COMMON_ASSETS } from "./constants/sound-common-assets";


@NgModule({
  declarations: [
    GameMenuComponent,
    GameExitConfirmationModalComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    GameMenuComponent,
    GameExitConfirmationModalComponent,
  ]
})
export class MenusSharedModule { 
  static forRoot(): ModuleWithProviders<MenusSharedModule> {
    return {
      ngModule: MenusSharedModule,
      providers: [
        {
          provide: INITIALIZE,
          useFactory: (als: AssetLoaderService) => ({
            initialize: () => firstValueFrom(als.preloadAssets(SOUND_COMMON_ASSETS))
          }),
          deps: [AssetLoaderService],
          multi: true
        }
      ]
    };
  }
}

