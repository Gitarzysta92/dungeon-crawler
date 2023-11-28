import { Injectable } from "@angular/core";
import { TileObject } from "@3d-scene/lib/actors/game-objects/tile.game-object";
import { filter, from, map, Observable, Subject, switchMap, takeUntil, tap } from "rxjs";
import { SceneInitializationService } from "../scene-initialization/scene-initialization.service";
import { FieldObject } from "@3d-scene/lib/actors/game-objects/field.game-object";
import { DungeonSceneStore } from "../../stores/dungeon-scene.store";
import { IActivityConfirmationResult } from "src/app/core/dungeon-ui/interfaces/activity-confirmation-result";
import { ISide } from "@game-logic/lib/features/board/coords.helper";
import { IBoardObjectRotation } from "@game-logic/lib/features/board/board.interface";

@Injectable()
export class SceneInteractionService {

  //private readonly _actorsFreelyInteractionForbiden: Subject<void> = new Subject();

  constructor(
    private readonly _sceneInitializationService: SceneInitializationService,
    private readonly _dungeonSceneStore: DungeonSceneStore
  ) { }

  public requireSelectRotation(
    object: TileObject,
    initialRotation: ISide,
    resolver: (provider: Observable<unknown>) => Promise<IActivityConfirmationResult>
  ): Promise<{ data: number, revertCallback: () => void }> {
    const promise = new Promise<{ data: number, revertCallback: () => void }>(async (resolve, reject) => {
      this._sceneInitializationService.rotateMenuComponent.showMenu(object, { hovered:0x000, settled: 0x000 })

      const tile = this._sceneInitializationService.rotateMenuComponent.tile;
      const provider = this._sceneInitializationService.mouseEvents$
        .pipe(
          filter(e => e.type === 'click'),
          switchMap(e => from(this._sceneInitializationService.rotateMenuComponent.rotateTile(e.x, e.y))),
          filter(r => !!r),
          tap(r => {
            const o = Object.assign({}, this._dungeonSceneStore.currentState.board.objects[tile.auxId]);
            o.rotation = o.rotation + r as IBoardObjectRotation;
            this._dungeonSceneStore.setObjectState(o);
          }),
      )
      
      const revertCallback = () => {
        const o = Object.assign({}, this._dungeonSceneStore.currentState.board.objects[tile.id]);
        o.rotation = initialRotation;
        this._dungeonSceneStore.setObjectState(o);
      }
      const decision = await resolver(provider);
      if (decision.confirmed) {
        resolve({
          data: this._dungeonSceneStore.currentState.board.objects[tile.auxId].rotation,
          revertCallback
        });
      } else {
        resolve({
          data: null, 
          revertCallback
        });
      }
      this._sceneInitializationService.rotateMenuComponent.hideMenu();
    });

    return promise;
  }

  public requireSelectField(
    allowedFieldIds: string[],
    resolver: (provider: Observable<unknown>) => Promise<IActivityConfirmationResult>
  ): Promise<{ data: FieldObject | null, revertCallback: () => void }> {
    return new Promise<{ data: FieldObject | null, revertCallback: () => void }>(async (resolve, reject) => {
      const fields = allowedFieldIds.map(id => this._sceneInitializationService.boardComponent.getField(id));
      if (fields.some(f => !f)) {
        reject();
      }
      this._sceneInitializationService.boardComponent.initializeFieldHovering(allowedFieldIds);
      const provider = this._sceneInitializationService.mouseEvents$
        .pipe(
          filter(e => e.type === 'click'),
          map(e => this._sceneInitializationService.boardComponent.getTargetedField(e.x, e.y)),
          filter(f => allowedFieldIds.some(id => id === f?.auxId)),
          tap(f => f && this._dungeonSceneStore.selectField(f.auxId))
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
      this._sceneInitializationService.boardComponent.disableHovering();
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
      const actors = allowedActorIds.map(id => this._sceneInitializationService.boardComponent.getTile(id));
      if (actors.some(f => !f)) {
        reject();
      }

      this._sceneInitializationService.boardComponent.initializeTileHovering(allowedActorIds);
      const provider = this._sceneInitializationService.mouseEvents$
        .pipe(
          filter(e => e.type === 'click'),
          map(e => this._sceneInitializationService.boardComponent.getTargetedTile(e.x, e.y)),
          filter(t => allowedActorIds.some(id => id === t?.id)),
          tap(t => t && this._dungeonSceneStore.selectActor(t.id))
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
      this._sceneInitializationService.boardComponent.disableHovering();
    });
  }

  public normalizeRotation(rotation: number, initialRotation: number): number {
    const possibleDirections = 6;
    rotation = initialRotation + (rotation % 6);
    if (rotation < 0 || rotation > possibleDirections - 1) {
      rotation = possibleDirections + rotation;
    }
    return rotation;
  }

  public listenForInteractionsWithActors(allowedActorIds: string[]): Observable<TileObject> {
    this._sceneInitializationService.boardComponent.initializeTileHovering(allowedActorIds);
    return this._sceneInitializationService.mouseEvents$
      .pipe(
        filter(e => e.type === 'click'),
        map(e => this._sceneInitializationService.boardComponent.getTargetedTile(e.x, e.y)),
        filter(t => allowedActorIds.some(id => id === t?.auxId)),
        tap(t => {
          this._sceneInitializationService.boardComponent.disableHovering();
        })
        //tap(t => t && this._dungeonSceneStore.selectActor(t.auxId)),
        //takeUntil(this._actorsFreelyInteractionForbiden)
      )
  }

  // public stopListenForInteractionsWithActors() {
  //   this._dungeonSceneStore.resetSelections();
    
  //   this._actorsFreelyInteractionForbiden.next();
  // }

}