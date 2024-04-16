import { PlayerType } from "../../../../base/player/players.constants";
import { IPlayer } from "../../../../base/player/players.interface";
import { IPlayerController } from "./turn-based-player.interface";


export class Player implements IPlayer {

  public id: string;
  public playerType: PlayerType;
  public groupId: string;

  constructor(
    data: IPlayer,
    private readonly _playerController: IPlayerController
  ) {
    this.id = data.id;
    this.playerType = data.playerType;
    this.groupId = data.groupId;
  }

  public canPerformTurn(state: unknown): boolean {
    return this._playerController.isAnyActivityAvailable()
  }

  public async performTurn(state: unknown) {
    while (this._playerController.isAnyActivityAvailable()) {
      const activityDelegate = await this._playerController.waitForActivity();
      await activityDelegate(state);
    }
  }
}