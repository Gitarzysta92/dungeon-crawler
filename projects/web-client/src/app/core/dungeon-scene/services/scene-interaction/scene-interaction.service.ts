import { Injectable } from "@angular/core";
import { TileObject } from "@3d-scene/lib/actors/game-objects/tile.game-object";
import { filter, from, map, Observable, startWith, switchMap,tap } from "rxjs";
import { SceneService } from "../scene.service";
import { FieldObject } from "@3d-scene/lib/actors/game-objects/field.game-object";
import { DungeonSceneStore } from "../../stores/dungeon-scene.store";
import { IActivityConfirmationResult } from "src/app/core/dungeon-ui/interfaces/activity-confirmation-result";
import { IBoardObjectRotation } from "@game-logic/lib/features/board/board.interface";
import { RotationHelper } from "@game-logic/lib/features/board/rotation.helper";

@Injectable()
export class SceneInteractionService {

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _dungeonSceneStore: DungeonSceneStore
  ) { }

  public requireSelectRotation(
    object: TileObject,
    initialRotation: IBoardObjectRotation,
    resolver: (provider: Observable<unknown>) => Promise<IActivityConfirmationResult>
  ): Promise<{ data: number, revertCallback: () => void }> {
    const promise = new Promise<{ data: number, revertCallback: () => void }>(async (resolve, reject) => {
      this._sceneService.rotateMenuComponent.showMenu(object, { hovered:0x000, settled: 0x000 })

      const tile = this._sceneService.rotateMenuComponent.tile;
      
      const provider = this._sceneService.mouseEvents$
        .pipe(
          filter(e => e.type === 'click'),
          switchMap(e => from(this._sceneService.rotateMenuComponent.rotateTile(e.x, e.y))),
          filter(r => !!r),
          map(r => {
            const boardObject = Object.assign({}, this._dungeonSceneStore.currentState.board.objects[tile.auxId]);
            boardObject.rotation = RotationHelper.calculateRotation(r, boardObject.rotation) as IBoardObjectRotation;
            this._dungeonSceneStore.setObjectState(boardObject);
            return boardObject.rotation;
          }),
      )
      
      const revertCallback = () => {
        const boardObject = Object.assign({}, this._dungeonSceneStore.currentState.board.objects[tile.auxId]);
        const o = Object.assign({}, boardObject);
        o.rotation = initialRotation;
        this._dungeonSceneStore.setObjectState(o);
      }
      const decision = await resolver(provider.pipe(startWith(initialRotation)));
      if (decision.confirmed) {
        resolve({
          data: decision.data as number,
          revertCallback
        });
      } else {
        resolve({
          data: null, 
          revertCallback
        });
      }
      this._sceneService.rotateMenuComponent.hideMenu();
    });

    return promise;
  }

  public requireSelectField(
    allowedFieldIds: string[],
    resolver: (provider: Observable<unknown>) => Promise<IActivityConfirmationResult>,
    initialFieldAuxId?: string
  ): Promise<{ data: FieldObject | null, revertCallback: () => void }> {
    return new Promise<{ data: FieldObject | null, revertCallback: () => void }>(async (resolve, reject) => {
      const fields = allowedFieldIds.map(id => this._sceneService.boardComponent.getField(id));
      if (fields.some(f => !f)) {
        reject();
      }
      this._sceneService.boardComponent.initializeFieldHovering(allowedFieldIds);
      let provider = this._sceneService.mouseEvents$
        .pipe(
          filter(e => e.type === 'click'),
          map(e => this._sceneService.boardComponent.getTargetedField(e.x, e.y)),
          filter(f => allowedFieldIds.some(id => id === f?.auxId)),
          tap(f => f && this._dungeonSceneStore.selectField(f.auxId)))
      
      if (!!initialFieldAuxId) {
        const field = this._sceneService.boardComponent.getField(initialFieldAuxId);
        if (field) {
          provider = provider.pipe(startWith(field));
        }
      }
    
      const confirmationResult = await resolver(provider);
      if (confirmationResult.confirmed) {
        resolve({
          data: confirmationResult.data as FieldObject,
          revertCallback: () => this._dungeonSceneStore.resetSelections()
        });
      } else {
        resolve({
          data: null,
          revertCallback: () => this._dungeonSceneStore.resetSelections() 
        });
        this._dungeonSceneStore.resetSelections();
      }
      this._sceneService.boardComponent.disableHovering();
    });
  }

  public highlightFields(allowedFieldRangeIds: string[]): void {
    this._dungeonSceneStore.highlightRange(allowedFieldRangeIds);
  }

  public requireSelectActor(
    allowedActorIds: string[],
    resolver: (provider: Observable<unknown>) => Promise<IActivityConfirmationResult>
  ): Promise<{ data: FieldObject | null, revertCallback: () => void }> {
    return new Promise<{ data: FieldObject | null, revertCallback: () => void }>(async (resolve, reject) => {
      const actors = allowedActorIds.map(id => this._sceneService.boardComponent.getTile(id));
      if (actors.some(f => !f)) {
        reject();
      }

      this._sceneService.boardComponent.initializeTileHovering(allowedActorIds);
      const provider = this._sceneService.mouseEvents$
        .pipe(
          filter(e => e.type === 'click'),
          map(e => this._sceneService.boardComponent.getTargetedTile(e.x, e.y)),
          filter(t => allowedActorIds.some(id => id === t?.auxId)),
          tap(t => t && this._dungeonSceneStore.selectActor(t.auxId)),
        )

      const confirmationResult = await resolver(provider);
      if (confirmationResult.confirmed) {
        resolve({
          data: confirmationResult.data as FieldObject,
          revertCallback: () => this._dungeonSceneStore.resetSelections()
        });
      } else {
        resolve({
          data: null,
          revertCallback: () => this._dungeonSceneStore.resetSelections() 
        });
      }
      this._sceneService.boardComponent.disableHovering();
    });
  }

  public listenForInteractionsWithActors(allowedActorIds: string[]): Observable<TileObject> {
    this._sceneService.boardComponent.initializeTileHovering(allowedActorIds);
    return this._sceneService.mouseEvents$
      .pipe(
        filter(e => e.type === 'click'),
        map(e => this._sceneService.boardComponent.getTargetedTile(e.x, e.y)),
        filter(t => allowedActorIds.some(id => id === t?.auxId)),
        tap(t => {
          this._sceneService.boardComponent.disableHovering();
        })
      )
  }
}