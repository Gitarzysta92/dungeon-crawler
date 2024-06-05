import { Component, OnInit, ViewChild } from "@angular/core";
import { ICubeCoordinates, IBoardObjectRotation } from "@game-logic/lib/modules/board/board.interface";
import { Size } from "@game-logic/lib/modules/board/entities/board-object/board-object.constants";
import { RotationHelper } from "@game-logic/lib/modules/board/helpers/rotation.helper";
import { Subject, filter, switchMap, from, takeUntil, firstValueFrom } from "rxjs";
import { imagesPath } from "src/app/core/game-data/constants/data-feed-commons";
import { SceneComponent, SceneInteractionService } from "src/app/core/scene/api";
import { SceneService } from "src/app/core/scene/services/scene.service";
import { exampleDungeonState } from "../../constants/example-dungeon-state";

@Component({
  selector: 'tile-rotation-dev-view',
  templateUrl: './tile-rotation-dev-view.component.html',
  styleUrls: ['./tile-rotation-dev-view.component.scss']
})
export class TileRotationDevViewComponent implements OnInit {
  @ViewChild(SceneComponent, { static: true }) canvas: SceneComponent | undefined;

  public performingRotationProcess: boolean = false;

  private _rotationAccept: Subject<void> = new Subject();
  private _onDestroy: Subject<void> = new Subject();


  private playerId: string = "88deb9ce-415e-4507-8a6c-374abbc7433f"

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _sceneInteractionService: SceneInteractionService
  ) { }

  ngOnInit(): void {
    // this._initializeScene();
    // this._createTile({ r: 0, q: 0, s: 0 });  
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public acceptRotation() {
    this._rotationAccept.next();
  }

  public async performRotationProcess() {
    // this.performingRotationProcess = true;
    // const boardObject = this._sceneService.components.boardComponent.getObjectById(this.playerId);
    // const tile = this._sceneService.boardComponent.getTile(this.playerId);
    // this._sceneService.rotateMenuComponent.showMenu(tile, { hovered: 0x000, settled: 0x000 })
    // this._displayOutletTrace(boardObject);
    // this._sceneService.mouseEvents$
    //   .pipe(
    //     filter(e => e.type === 'click'),
    //     switchMap(e => from(this._sceneService.rotateMenuComponent.rotateTile(e.x, e.y))),
    //     filter(r => !!r),
    //     takeUntil(this._rotationAccept)
    //   )
    //   .subscribe(r => {
    //     boardObject.rotation = RotationHelper.calculateRotation(r, boardObject.rotation);
    //     this._rotateTile(boardObject.rotation, tile);
    //     console.log(boardObject.rotation);
    //   })

    // await firstValueFrom(this._rotationAccept);
    // this._rotationAccept.next();
    // this._sceneService.rotateMenuComponent.hideMenu();
    // this._removeHighlightFromFields();
    // this.performingRotationProcess = false;
  }

  private _initializeScene(): void {
    // const dungeonDataFeed: IDungeonDataFeedEntity = dungeonDataFeedEntity;
    // this._board = new Board(exampleDungeonState.board as any);
    // this._board.objects = {};
    // this._sceneService.createScene(
    //   this.canvas.canvas.nativeElement,
    //   this.canvas.listenForMouseEvents(),
    //   dungeonDataFeed.visualScene,
    //   this._fields
    // );
  }

  // private _createTile(position: IBoardCoordinates): void {
  //   const { tile, data } = this._createTileData(`${imagesPath}/hero.png`, position, 0);
  //   this._sceneService.createTile(this.playerId, tile, data as any);
  //   const field = this._board.getFieldByPosition(tile.position)
  //   this._board.assignObject(tile, field, tile.rotation)
  // }

  // private async _rotateTile(rotation: IBoardObjectRotation, tile: TileObject): Promise<void> {
  //   const object = this._board.getObjectById(this.playerId);
  //   await this._sceneService.boardComponent.rotateTile(tile, rotation);
  //   this._displayOutletTrace(object)
  // }

  // private _displayOutletTrace(o: IAassignedBoardObject): void {
  //   this._removeHighlightFromFields();
  //   let fields = Object.values(this._board.fields);
  //   fields = this._board.getFieldsBySelector({
  //     selectorOrigin: o,
  //     selectorType: 'line',
  //     selectorRange: 5,
  //   });

  //   for (let field of fields) {
  //     this._sceneService.boardComponent.getField(field.id).highlight();
  //   }
  // }

  // private _removeHighlightFromFields() {
  //   let fields = Object.values(this._board.fields);
  //   for (let field of fields) {
  //     this._sceneService.boardComponent.getField(field.id).removeHighlight();
  //   }
  // }

  // private _createTileData(imagePath: string, position: IBoardCoordinates, rotation: IBoardObjectRotation) {
  //   const id = this.playerId;
  //   return {
  //     id,
  //     tile: { id, position, rotation, outlets: [Outlet.Top], size: Size.Medium },
  //     data: {
  //       entityType: DataFeedEntityType.Actor,
  //       informative: { name: imagePath, description: imagePath },
  //       visualScene: {
  //         auxId: "",
  //         mapTexture: { url: imagePath },
  //         color: 0x0002,
  //       },
  //       visualUi: {
  //         avatar: { url: imagePath },
  //         color: 0x0002
  //       }
  //     }
  //   }
  // }

}
