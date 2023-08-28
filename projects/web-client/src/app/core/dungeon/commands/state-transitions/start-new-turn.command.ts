import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { BaseCommandAsync, CommandMetadata } from "src/app/aspects/commands/command-bus/base-command";
import { ModalService } from "src/app/shared/dialogs/services/modal/modal.service";
import { GameplayCaptionComponent } from "../../../gameplay-ui/components/gameplay-caption/gameplay-caption.component";
import { GameplayService } from "../../services/gameplay/gameplay.service";
import { GameLogicService } from "../../../dungeon-logic/api";



@Injectable()
export class StartNewTurn extends BaseCommandAsync {

  public static metadata: CommandMetadata = { name: "Start new turn" };

  constructor(
    private readonly _gameLogicService: GameLogicService,
    private readonly _gameplayService: GameplayService,
    private readonly _modalService: ModalService
  ) {
    super();
  }

  public async execute(): Promise<void> {
    this._gameLogicService.startTurn();
    const currentPlayerId = this._gameLogicService.getCurrentPlayerId();
    const currentPlayer = this._gameplayService.gameplayFeed.players.find(p => p.id === currentPlayerId);
    const dialog = this._modalService.open(GameplayCaptionComponent, {
      message: `${currentPlayer.nickname} Round`
    });
    await firstValueFrom(dialog.afterClosed());
    this.finish.next();
  }

}