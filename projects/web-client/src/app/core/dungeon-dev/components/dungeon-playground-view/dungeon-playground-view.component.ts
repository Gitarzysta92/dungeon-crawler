<<<<<<< HEAD
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
=======
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150
import { dungeonDataFeedEntity } from 'src/app/core/data-feed/constants/data-feed-dungeons';
import { IDungeonDataFeedEntity } from 'src/app/core/data-feed/interfaces/data-feed-dungeon-entity.interface';
import { SceneService } from 'src/app/core/dungeon-scene/services/scene.service';
import { exampleDungeonState } from '../../constants/example-dungeon-state';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { IBoardCoordinates, IBoardObjectRotation, IVectorAndDistanceEntry } from '@game-logic/lib/features/board/board.interface';
import { v4 } from 'uuid';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { Board } from '@game-logic/lib/features/board/board';
<<<<<<< HEAD
import { TileObject } from '@3d-scene/lib/actors/game-objects/tile.game-object';
import { FieldObject } from '@3d-scene/lib/actors/game-objects/field.game-object';
import { Size } from '@game-logic/lib/features/board/board.constants';
=======
import { FieldBase } from '@3d-scene/lib/actors/game-objects/fields/common/base-field.game-object';
import { TokenBase } from '@3d-scene/lib/actors/game-objects/tokens/common/token-base.game-object';
import { ISceneInitialData } from '@3d-scene/app/scene-app.interface';
import { ICommonTileComposerDefinition } from '@3d-scene/lib/actors/game-objects/tokens/common-tile/common-tile.interface';
import { mapHexagonalCoordsTo3dCoords } from 'src/app/core/dungeon-scene/mappings/dungeon-scene-mappings';
import { commonTileComposerDefinitionName } from '@3d-scene/lib/actors/game-objects/tokens/common-tile/common-tile.constants';

>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150

@Component({
  selector: 'dungeon-playground-view',
  templateUrl: './dungeon-playground-view.component.html',
  styleUrls: ['./dungeon-playground-view.component.scss'],
})
export class DungeonPlaygroundViewComponent implements AfterViewInit, OnDestroy {

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
  
  ngAfterViewInit(): void {
    this._initializeScene();
    const heroInitialPosition = this._board.getObjectById(this.playerId).position;
    this._createHero(heroInitialPosition);
    this._createObstacles();
    this._createVectors(heroInitialPosition);

    this._sceneService.inputs$
      .pipe(
        filter(e => e.type === 'mousemove'),
        map(e => this._sceneService.components.boardComponent.getTargetedToken(e.x, e.y)),
        takeUntil(this._onDestroy)
      )
      .subscribe(x => {
        if (!x) {
          return;
        }
        this.entry = this._preservedVectorMap.get(x.auxId.replace("vector", ""));
      })


    this._sceneService.inputs$
    .pipe(
      filter(e => e.type === 'click'),
      map(e => this._sceneService.components.boardComponent.getTargetedToken(e.x, e.y) ??
        this._sceneService.components.boardComponent.getTargetedField(e.x, e.y)),
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

  private _toggleHero(x: TokenBase | FieldBase): void {
    if (x instanceof FieldBase && !this._board.getObjectById(this.playerId)) {
      const field = this._board.fields[x.auxId];
      this._board.assignObject({ id: this.playerId, outlets: [], size: Size.Medium }, field, 0)
      this._createHero(field.position);
      
    } else if (this._board.getObjectById(x.auxId) && x instanceof TokenBase) {
      this._board.unassignObject(this._board.getObjectById(x.auxId));
      this._sceneService.services.actorsManager.deleteObject(x);
    }
  }

  private toggleObstacle(x: TokenBase | FieldBase): void {
    if (x instanceof FieldBase && !this._board.fields[x.auxId].isOccupied()) {
      const field = this._board.fields[x.auxId];
      const id = v4();
      this._board.assignObject({ id: id, outlets: [], size: Size.Medium }, field, 0)
      this._createObstacle(field.position, id);
    } else if (this._board.getObjectById(x.auxId) && x instanceof TokenBase) {
      this._board.unassignObject(this._board.getObjectById(x.auxId));
      this._sceneService.services.actorsManager.deleteObject(x);
    } else if (x instanceof TokenBase && !this._board.getObjectById(x.auxId)) {
      this._removeVectors();
      const field = this._board.fields[x.auxId.replace("vector", "")];
      const id = v4();
      this._board.assignObject({ id: id, outlets: [], size: Size.Medium }, field, 0)
      this._createObstacle(field.position, id);
    }
  }

  private _initializeScene(): void {
    const dungeonDataFeed: IDungeonDataFeedEntity = dungeonDataFeedEntity;
    const initialData: ISceneInitialData = {
      bgColor: dungeonDataFeed.visualScene.bgColor,
      composerDefinitions: dungeonDataFeed.visualScene.composerDefinitions
    };
    this._board = new Board(exampleDungeonState.board as any);
    this._sceneService.initializeScene(initialData);
  }



  private _createVectors(
    origin: IBoardCoordinates,
  ): void {
    if (this._preservedVectorMap) {
      for (let entry of this._preservedVectorMap.values()) {
        if (entry.isOrigin) {
          continue;
        }
        this._sceneService.services.actorsManager.deleteObjectByAuxId(CoordsHelper.createKeyFromCoordinates(entry.coords) + "vector")
      }
    }
    const vectorMap = CoordsHelper.createVectorDistanceMap(
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
        this._sceneService.services.actorsManager.deleteObjectByAuxId(CoordsHelper.createKeyFromCoordinates(entry.coords) + "vector")
      }
    }
  }

  private _createObstacles() {
    for (let object of this._objects.filter(o => o.id !== this.playerId)) {
      this._createObstacle(object.position, object.id);
    }
  }

  private _createHero(position: IBoardCoordinates): void {
    const token = this._createTokenData(this.playerId, ['hero','png'], position, 0);
    const fieldAuxId = CoordsHelper.createKeyFromCoordinates(position);
    this._sceneService.components.boardComponent.createToken(token, fieldAuxId);
  }


  private _createObstacle(position: IBoardCoordinates, id: string): void {
    const token = this._createTokenData(v4(),['obstacle','png'], position, 0);
    const fieldAuxId = CoordsHelper.createKeyFromCoordinates(position);
    this._sceneService.components.boardComponent.createToken(token, fieldAuxId);
  }


  private _createVector(position: IBoardCoordinates, rotation: IBoardObjectRotation): void {
    const token = this._createTokenData(CoordsHelper.createKeyFromCoordinates(position) + "vector", ['vector-arrow','png'], position, rotation);
    const fieldAuxId = CoordsHelper.createKeyFromCoordinates(position);
    this._sceneService.components.boardComponent.createToken(token, fieldAuxId);
  }

  
  private _createTokenData(
    id: string,
    image: [string, string],
    position: IBoardCoordinates,
    rotation: IBoardObjectRotation
  ): ICommonTileComposerDefinition {
    return {
<<<<<<< HEAD
      id,
      tile: { id, position, rotation, size: Size.Medium, outlets: [] },
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
=======
      definitionName: commonTileComposerDefinitionName,
      auxId: id,
      takenFieldId: CoordsHelper.createKeyFromCoordinates(position),
      position: mapHexagonalCoordsTo3dCoords(position),
      rotation,
      texture: { 
        assetName: image[0],
        extensionName: image[1],
      },
      primaryColor: 0xffffff,
      jawelColor: 0x000000,
      outlets: [0],
      initialAnimationDelay: 1000
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150
    }
  }
}
