import { ModuleWithProviders, NgModule } from "@angular/core";
import { INITIALIZE } from "src/app/infrastructure/configuration/api";
import { GameSavesStore } from "./stores/game-saves.store";

@NgModule({
  declarations: [],
  imports: []
})
export class GamePersistenceSharedModule { 
  static forRoot(): ModuleWithProviders<GamePersistenceSharedModule> {
    return {
      ngModule: GamePersistenceSharedModule,
      providers: [
        GameSavesStore,
        { provide: INITIALIZE, useExisting: GameSavesStore, multi: true },
      ]
    };
  }
}