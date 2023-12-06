import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { dungeonDataFeedEntity } from 'src/app/core/data-feed/constants/data-feed-dungeons';
import { IDungeonDataFeedEntity } from 'src/app/core/data-feed/interfaces/data-feed-dungeon-entity.interface';
import { SceneComponent } from 'src/app/core/dungeon-scene/api';
import { SceneService } from 'src/app/core/dungeon-scene/services/scene.service';
import { exampleDungeonState } from '../../constants/example-dungeon-state';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { imagesPath } from 'src/app/core/data-feed/constants/data-feed-commons';
import { DataFeedEntityType } from 'src/app/core/data-feed/constants/data-feed-entity-type';
import { IBoardCoordinates, IBoardObjectRotation, IVectorAndDistanceEntry } from '@game-logic/lib/features/board/board.interface';
import { v4 } from 'uuid';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { Board } from '@game-logic/lib/features/board/board';
import { TileObject } from '@3d-scene/lib/actors/game-objects/tile.game-object';
import { FieldObject } from '@3d-scene/lib/actors/game-objects/field.game-object';

@Component({
  selector: 'dungeon-playground-view',
  templateUrl: './dungeon-playground-view.component.html',
  styleUrls: ['./dungeon-playground-view.component.scss']
})
export class DungeonPlaygroundViewComponent implements OnInit, OnDestroy {
  @ViewChild(SceneComponent, { static: true }) canvas: SceneComponent | undefined;

  public tileToToggle: string = "hero";
  public entry: IVectorAndDistanceEntry | undefined;

  private _onDestroy: Subject<void> = new Subject();
  private _board: Board<{}>;
  private _preservedVectorMap: Map<string, IVectorAndDistanceEntry> | undefined;

  private get _objects() { return Object.values(this._board.objects) };
  private get _fields() { return Object.values(this._board.fields) };

  private playerId: string = "88deb9ce-415e-4507-8a6c-374abbc7433f"

  constructor(
    private readonly _sceneService: SceneService,
  ) { }
  
  ngOnInit(): void {
    this._initializeScene();
    const heroInitialPosition = this._board.getObjectById(this.playerId).position;
    this._createHero(heroInitialPosition);
    this._createObstacles();
    this._createVectors(heroInitialPosition);

    this._sceneService.mouseEvents$
      .pipe(
        filter(e => e.type === 'mousemove'),
        map(e => this._sceneService.boardComponent.getTargetedTile(e.x, e.y)),
        takeUntil(this._onDestroy)
      )
      .subscribe(x => {
        if (!x) {
          return;
        }
        this.entry = this._preservedVectorMap.get(x.auxId.replace("vector", ""));
      })


    this._sceneService.mouseEvents$
    .pipe(
      filter(e => e.type === 'click'),
      map(e => this._sceneService.boardComponent.getTargetedTile(e.x, e.y) ??
        this._sceneService.boardComponent.getTargetedField(e.x, e.y)),
      takeUntil(this._onDestroy)
    )
      .subscribe(x => {
        if (!x) {
          return;
        }
        if (this.tileToToggle === "obstacle") {
          this.toggleObstacle(x);
        } else if (this.tileToToggle === "hero") {
          this._toggleHero(x);
        }
        const o = this._board.getObjectById(this.playerId);
        if (!!o) {
          this._createVectors(o.position);
        } else {
          this._removeVectors();
        }
      })
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  private _toggleHero(x: TileObject | FieldObject): void {
    if (x instanceof FieldObject && !this._board.getObjectById(this.playerId)) {
      const field = this._board.fields[x.auxId];
      this._board.assignObject({ id: this.playerId, outlets: [] }, field, 0)
      this._createHero(field.position);
      
    } else if (this._board.getObjectById(x.auxId) && x instanceof TileObject) {
      this._board.unassignObject(this._board.getObjectById(x.auxId));
      this._sceneService.sceneComposer.removeTile(x.auxId);
    }
  }

  private toggleObstacle(x: TileObject | FieldObject): void {
    if (x instanceof FieldObject && !this._board.fields[x.auxId].isOccupied()) {
      const field = this._board.fields[x.auxId];
      const id = v4();
      this._board.assignObject({ id: id, outlets: [] }, field, 0)
      this._createObstacle(field.position, id);
    } else if (this._board.getObjectById(x.auxId) && x instanceof TileObject) {
      this._board.unassignObject(this._board.getObjectById(x.auxId));
      this._sceneService.sceneComposer.removeTile(x.auxId);
    } else if (x instanceof TileObject && !this._board.getObjectById(x.auxId)) {
      this._removeVectors();
      const field = this._board.fields[x.auxId.replace("vector", "")];
      const id = v4();
      this._board.assignObject({ id: id, outlets: [] }, field, 0)
      this._createObstacle(field.position, id);
    }
  }

  private _initializeScene(): void {
    const dungeonDataFeed: IDungeonDataFeedEntity = dungeonDataFeedEntity;
    this._board = new Board(exampleDungeonState.board as any)
    this._sceneService.createScene(
      this.canvas.canvas.nativeElement,
      this.canvas.listenForMouseEvents(),
      dungeonDataFeed.visualScene,
      this._fields
    );
  }


  private _createHero(position: IBoardCoordinates): void {
    const { tile, data } = this._createTileData(`${imagesPath}/hero.png`, position, 0);
    this._sceneService.createTile(this.playerId, tile, data as any);
  }


  private _createObstacles() {
    for (let object of this._objects.filter(o => o.id !== this.playerId)) {
      this._createObstacle(object.position, object.id);
    }
  }


  private _createObstacle(position: IBoardCoordinates, id: string): void {
    const { tile, data } = this._createTileData(`${imagesPath}/obstacle.png`, position, 0);
    this._sceneService.createTile(id, tile, data as any);  
  }


  private _createVectors(
    origin: IBoardCoordinates,
  ): void {
    if (this._preservedVectorMap) {
      for (let entry of this._preservedVectorMap.values()) {
        if (entry.isOrigin) {
          continue;
        }
        this._sceneService.sceneComposer.removeTile(CoordsHelper.createKeyFromCoordinates(entry.coords) + "vector")
      }
    }
    const vectorMap = CoordsHelper.createVectorAndDistanceMap(
      origin,
      this._objects.map(o => o.position),
      this._fields.map(f => f.position)
    );
    for (let entry of vectorMap.values()) {
      if (entry.isOrigin) {
        continue;
      }
      this._createVector(entry.coords, entry.vector);
    }
    this._preservedVectorMap = vectorMap;
  }

  private _removeVectors(): void {
    if (this._preservedVectorMap) {
      for (let entry of this._preservedVectorMap.values()) {
        if (entry.isOrigin) {
          continue;
        }
        this._sceneService.sceneComposer.removeTile(CoordsHelper.createKeyFromCoordinates(entry.coords) + "vector")
      }
    }
  }


  private _createVector(position: IBoardCoordinates, rotation: IBoardObjectRotation): void {
    const { tile, data } = this._createTileData(`${imagesPath}/development/vector-arrow.png`, position, rotation);
      this._sceneService.createTile(CoordsHelper.createKeyFromCoordinates(position) + "vector", tile, data as any);  
  }

  
  private _createTileData(imagePath: string, position: IBoardCoordinates, rotation: IBoardObjectRotation) {
    const id = v4()
    return {
      id,
      tile: { id, position, rotation },
      data: {
        entityType: DataFeedEntityType.Actor,
        informative: { name: imagePath, description: imagePath },
        visualScene: {
          auxId: "",
          mapTexture: { url: imagePath },
          color: 0x0002,
        },
        visualUi: {
          avatar: { url: imagePath },
          color: 0x0002
        }
      }
    }
  }
}
