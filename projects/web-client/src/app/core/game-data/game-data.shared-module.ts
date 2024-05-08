import { ModuleWithProviders, NgModule } from "@angular/core";
import { INITIALIZE } from "src/app/infrastructure/configuration/api";
import { DataSeedService } from "./services/data-seed.service";
import { persistanceSeed } from "../game-persistence/constants/game-persistence.constants";
import { gameplaySeed } from "./constants/data-seed";


@NgModule({
  declarations: [],
  imports: []
})
export class GameDataSharedModule { 
  static forRoot(): ModuleWithProviders<GameDataSharedModule> {
    return {
      ngModule: GameDataSharedModule,
      providers: [
        {
          provide: INITIALIZE,
          useFactory: (dfs: DataSeedService) => ({
            initialize: () => {
              dfs.loadData(gameplaySeed);
              dfs.loadData(persistanceSeed);
            }
          }), 
          multi: true,
          deps: [DataSeedService]
        }
      ]
    };
  }
}