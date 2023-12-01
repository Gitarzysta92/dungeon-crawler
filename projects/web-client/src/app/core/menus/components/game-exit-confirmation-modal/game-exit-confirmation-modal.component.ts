import { Component } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { ModalService } from 'src/app/shared/dialogs/services/modal/modal.service';
//import { GameplayService } from '../../services/gameplay/gameplay.service';

@Component({
  selector: 'app-game-exit-confirmation-modal',
  templateUrl: './game-exit-confirmation-modal.component.html',
  styleUrls: ['./game-exit-confirmation-modal.component.scss']
})
export class GameExitConfirmationModalComponent {


  constructor(
    private readonly _routingService: RoutingService,
    private readonly _modalService: ModalService,
  ) { }

  stayInGame(): void {
    this._modalService.close();
  }

  exitGame(): void {
    this._modalService.close();
    this._routingService.navigateToMainMenu();
  }
}
