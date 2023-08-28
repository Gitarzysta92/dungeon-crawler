import { Injectable } from "@angular/core";
import { TileObject } from "@3d-scene/lib/actors/game-objects/tile.game-object";

import { Observable, firstValueFrom, filter, map, take, tap, of } from "rxjs";
import { BaseCommandAsync, CommandMetadata } from "src/app/aspects/commands/command-bus/base-command";
import { RevertableAsync } from "src/app/aspects/commands/commands-stack/commands-stack.service";
import { SceneInteractionService } from "src/app/core/gameplay-scene/api";
import { IGameplayFeed } from "../../models/gameplay-feed";
import { GameplayService } from "../../services/gameplay/gameplay.service";


@Injectable()
export class SelectTiles extends BaseCommandAsync implements RevertableAsync {

  public static metadata: CommandMetadata = { name: "Select tiles" };
  public canBeReverted: boolean = false;

  constructor(
    private readonly _gameplayService: GameplayService,
    private readonly _sceneService: SceneInteractionService
  ) {
    super();
  }

  public async execute(): Promise<void> {
    // const gameState = this._gameplayService.gameplayFeed.gameState;
    // const gameplayFeed = this._gameplayService.gameplayFeed;
    // const tiles = this._createTileObjects(gameState, gameplayFeed);

    // const numberOfTilesToSelect = gameplayFeed.gameState.actualPlayer.numberOfTilesToKeep;
    // this._sceneService.openSelectionTileDialog(tiles);

    // const selectedTileIds = await firstValueFrom(this._listenForTilesSelect(tiles, numberOfTilesToSelect));
    // this._gameplayService.discardTiles(gameState.actualPlayer.playablesSlot.filter(id => !selectedTileIds.includes(id)));

    // await this._sceneService.selectTilesForStaging(tiles.filter(t => selectedTileIds.includes(t.auxId)));
    // this._sceneService.dialogComponent.closeDialog();
    // this.finish.next();
  }

  public revertAsync(): Promise<void> {
    return new Promise(() => null);
  }

  private _createTileObjects(gameState: any, feed: IGameplayFeed): TileObject[] {
    // return gameState.actualPlayer.playablesSlot.map(id => {
    //   const tile = feed.tiles.find(t => t.id === id);
    //   const tileImage = feed.tileImages.find(tg => tg.tileId === id);
    //   return this._sceneService.createTile(id, tileImage?.imageUrl, tile.graphicalData?.colors?.primary);
    // });
    return [];
  }

  private _listenForTilesSelect(tiles: TileObject[], selectionTarget: number = 1): Observable<string[]> {
    // let tiles2 = new Map();

    // return this._sceneService.listenForGameObjectClickEvent()
    //   .pipe(
    //     map(e => this._sceneService.dialogComponent.getTargetedTile(e.clientX, e.clientY)),
    //     filter(tile => !!tile && tiles.includes(tile)),
    //     tap(tile => {
    //       if (tiles2.has(tile)) {
    //         tile.unselect();
    //         tiles2.delete(tile);
    //       } else {
    //         tile.select();
    //         tiles2.set(tile, tile);
    //       }
    //     }),
    //     filter(() => tiles2.size === selectionTarget),
    //     map(() => [...tiles2].map(([_, value]) => value.auxId)),
    //     take(1)
    //   )

    return of([])
  }
}