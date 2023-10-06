import { Injectable } from "@angular/core";
import { TileObject } from "@3d-scene/lib/actors/game-objects/tile.game-object";
import { filter, from, map, Observable, switchMap, tap } from "rxjs";
import { SceneInitializationService } from "../scene-initialization/scene-initialization.service";
import { FieldObject } from "@3d-scene/lib/actors/game-objects/field.game-object";
import { DungeonSceneStore } from "../../stores/dungeon-scene.store";
import { IActivityConfirmationResult } from "src/app/core/dungeon-ui/interfaces/activity-confirmation-result";

@Injectable()
export class SceneInteractionService {
  constructor(
    private readonly _sceneInitializationService: SceneInitializationService,
    private readonly _dungeonSceneStore: DungeonSceneStore
  ) { }

  public requireSelectRotation(
    object: TileObject,
    resolver: (provider: Observable<unknown>) => Promise<IActivityConfirmationResult>
  ): Promise<{ data: number, revertCallback: () => void }> {
    const promise = new Promise<{ data: number, revertCallback: () => void }>(async (resolve, reject) => {
      this._sceneInitializationService.rotateMenuComponent.showMenu(object, { hovered:0x000, settled: 0x000 })

      const tile = this._sceneInitializationService.rotateMenuComponent.tile;
      const q = this._sceneInitializationService.rotateMenuComponent.initialQuaternion;

      const rotations = [];
      const provider = this._sceneInitializationService.mouseEvents$
        .pipe(
          filter(e => e.type === 'click'),
          switchMap(e => from(this._sceneInitializationService.rotateMenuComponent.rotateTile(e.x, e.y))),
          filter(r => !!r),
          tap(r => rotations.push(r)),
          map(() => rotations)
        )

      const decision = await resolver(provider);
      if (decision.confirmed) {
        resolve({
          data: rotations.reduce((a, c) => a + c, 0),
          revertCallback: () => this._sceneInitializationService.rotateMenuComponent.resetRotation(tile, q)
        });
      } else {
        resolve({
          data: null,
          revertCallback: () => this._sceneInitializationService.rotateMenuComponent.resetRotation(tile, q)
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

  public requireSelectActor(
    allowedFieldRangeIds: string[],
    allowedActorIds: string[],
    resolver: (provider: Observable<unknown>) => Promise<IActivityConfirmationResult>
  ): Promise<{ data: FieldObject | null, revertCallback: () => void }> {
    return new Promise<{ data: FieldObject | null, revertCallback: () => void }>(async (resolve, reject) => {
      const actors = allowedActorIds.map(id => this._sceneInitializationService.boardComponent.getTile(id));
      if (actors.some(f => !f)) {
        reject();
      }

      console.log(allowedFieldRangeIds);

      this._dungeonSceneStore.highlightRange(allowedFieldRangeIds);
      //this._sceneInitializationService.boardComponent.initializeTileHovering(allowedActorIds);
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
}