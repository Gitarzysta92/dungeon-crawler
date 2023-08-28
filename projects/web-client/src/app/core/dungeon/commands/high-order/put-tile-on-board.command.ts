
import { Injectable } from "@angular/core";
import { TileObject } from "@3d-scene/lib/actors/game-objects/tile.game-object";
import { lastValueFrom } from "rxjs";
import { BaseCommandAsync, Command, CommandMetadata } from "src/app/aspects/commands/command-bus/base-command";
import { CommandsFactory } from "src/app/aspects/commands/commands-factory";
import { SceneInteractionService } from "src/app/core/gameplay-scene/api";
import { GameplayService } from "../../services/gameplay/gameplay.service";
import { DeployTile } from "../state-transitions/deploy-tile.command";
import { DisposeTile } from "../state-transitions/dispose-tile.command";

@Injectable()
export class PutTileOnBoard extends BaseCommandAsync {

  public static metadata: CommandMetadata = { name: "Put tile on the board" };
  private _tile: TileObject;

  constructor(
    private readonly _gameplayService: GameplayService,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _command: CommandsFactory
  ) {
    super();
  }

  public setParameters(tile: TileObject): Command<this> {
    this._tile = tile;
    return this;
  }

  public async execute(): Promise<void> {
    await lastValueFrom(this._sceneInteractionService.dragTileAndListenForRelease(this._tile));

    // const tileData = this._gameplayService.gameplayFeed.tiles.find(t => t.id === this._tile.auxId);
    // if (tileData.type === TileType.Action) {
    //   this._command.create(DisposeTile)
    //     .setParameters(this._tile)
    //     .dispatch()
    //     .finished$
    //     .subscribe(() => this.finish.next());
    // } else {
    //   this._command.create(DeployTile)
    //     .setParameters(this._tile)
    //     .dispatch()
    //     .finished$
    //     .subscribe(() => this.finish.next());
    // }
  }  
}
