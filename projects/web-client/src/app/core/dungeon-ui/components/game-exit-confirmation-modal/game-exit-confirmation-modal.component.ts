import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/dialogs/services/modal/modal.service';
//import { GameplayService } from '../../services/gameplay/gameplay.service';

@Component({
  selector: 'app-game-exit-confirmation-modal',
  templateUrl: './game-exit-confirmation-modal.component.html',
  styleUrls: ['./game-exit-confirmation-modal.component.scss']
})
export class GameExitConfirmationModalComponent {


  constructor(
    //private readonly _gameplayService: GameplayService,
    private readonly _modalService: ModalService,
  ) { }

  stayInGame(): void {
    this._modalService.close();
  }

  exitGame(): void {
    //this._gameplayService.exitGame();
  }
}
