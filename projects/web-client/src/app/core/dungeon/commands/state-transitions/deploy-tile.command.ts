import { FieldObject } from "@3d-scene/lib/actors/game-objects/field.game-object";
import { TileObject } from "@3d-scene/lib/actors/game-objects/tile.game-object";
import { from, lastValueFrom, Observable, of, switchMap, takeUntil, tap, merge } from "rxjs";
import { BaseCommandAsync, Command, CommandMetadata } from "src/app/aspects/commands/command-bus/base-command";
import { RevertableAsync } from "src/app/aspects/commands/commands-stack/commands-stack.service";
import { SceneInteractionService } from "src/app/core/gameplay-scene/api";
;
import { GameplayService } from "../../services/gameplay/gameplay.service";



export class DeployTile extends BaseCommandAsync implements RevertableAsync {

  public static metadata: CommandMetadata = { name: "Deploy tile" };
  public canBeReverted: boolean = false;

  private _tile: TileObject;
  private _field: FieldObject;

  constructor(
    private readonly _gameplayService: GameplayService,
    private readonly _sceneService: SceneInteractionService,
  ) {
    super();
  }
  
  public setParameters(tile: TileObject): Command<this> {
    this._tile = tile;
    return this;
  }

  public async execute(): Promise<void> {
    //const field = this._sceneService.boardComponent.getFieldTargetedByDraggedTile();
    
    try {
      // const coords = this._gameplayService.gameplayFeed.coordsMapping
      //   .find(m => m.x == field.auxCoords.x && m.y == field.auxCoords.y)?.coord;
      
      //this._gameplayService.deployTile(this._tileData, coords);
    } catch (error) {
      // await this._sceneService.bringDraggedTileToStaging();
      // this.finish.next();
      // throw error;
    }

    // await this._sceneService.attachTileToBoard(this._tile);
    // await lastValueFrom(this._listenForTileRotation(this._tile));
    // this._sceneService.hideControls();

    // this._field = field;
    // this.canBeReverted = true;
    // this.finish.next();
  }

  public async revertAsync(): Promise<void> {
    if (this.canBeReverted) {
      //this._gameplayService.revertLastActivity();
      // await this._sceneService.boardComponent.detachTileFromField(this._tile);
      // await this._sceneService.stagingComponent.bringBackTile(this._tile);
    }
  };

  private _listenForTileRotation(tile: TileObject): Observable<any> {
    // return from(this._sceneService.showRotateControls(tile))
    //   .pipe(
    //     switchMap(() => merge(
    //       of(null),
    //       this._sceneService.listenForGameObjectClickEvent()
    //     )),
    //     tap(e => {
    //       if (!!e) {
    //         this._sceneService.rotateTile(e);
    //       }
    //     }),
    //     takeUntil(this._gameplayEvents.tileActionConfirmed$)
    //   )
    return of();
  }
}