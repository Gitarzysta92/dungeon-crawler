import { Injectable } from '@angular/core';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { IDungeonSceneState } from 'src/app/core/dungeon-scene/interfaces/dungeon-scene-state';
import { IDungeonUiState } from 'src/app/core/dungeon-ui/interfaces/dungeon-ui-state';
import { IDungeonInteractionState } from '../../interfaces/interaction-state.interface';
import { IDungeonViewModel } from '../../interfaces/view-model.interface';
import { UiViewModelService } from 'src/app/core/dungeon-ui/services/ui-view-model/ui-view-model.service';
import { SceneViewModelService } from 'src/app/core/dungeon-scene/services/scene-view-model/scene-view-model.service';

@Injectable()
export class DungeonViewModelService {

  constructor(
    private readonly _uiViewModelService: UiViewModelService,
    private readonly _sceneViewModelService: SceneViewModelService
  ) { }


  public async mapStatesToViewModel(
    d: DungeonState,
    s: IDungeonSceneState,
    ui: IDungeonUiState,
    i: IDungeonInteractionState
  ): Promise<IDungeonViewModel> {
    let state: IDungeonViewModel = {} as IDungeonViewModel;
    state.hero = d.hero;
    
    state = Object.assign(state, await this._sceneViewModelService.updateSceneState(d, s, i));
    state = Object.assign(state, await this._uiViewModelService.updateUiState(d, ui, i));
    state = Object.assign(state, i);

    return state as IDungeonViewModel;
  }
  
 
  
  public getInitialViewModel(): IDungeonViewModel {
    let state = {
      hero: {}
    };
    state = Object.assign(state, this._sceneViewModelService.getInitialSceneState());
    state = Object.assign(state, this._uiViewModelService.getInitialUiState());
    //state = Object.assign(state, i);
  
    return state as IDungeonViewModel;
  }
}
