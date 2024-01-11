import { Injectable } from "@angular/core";
import { filter, from, map, Observable, switchMap,tap } from "rxjs";
import { SceneService } from "../scene.service";
import { DungeonSceneStore } from "../../stores/dungeon-scene.store";
import { IActivityConfirmationResult } from "src/app/core/dungeon-ui/interfaces/activity-confirmation-result";
import { IBoardObjectRotation } from "@game-logic/lib/features/board/board.interface";
import { TokenBase } from "@3d-scene/lib/actors/game-objects/tokens/common/token-base.game-object";
import { Rotatable } from "@3d-scene/lib/behaviors/rotatable/rotatable.mixin";
import { FieldBase } from "@3d-scene/lib/actors/game-objects/fields/common/base-field.game-object";

@Injectable()
export class SceneInteractionService {

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _dungeonSceneStore: DungeonSceneStore
  ) { }

  public requireSelectRotation(
    token: TokenBase,
    initialRotation: IBoardObjectRotation,
    resolver: (provider: Observable<unknown>) => Promise<IActivityConfirmationResult>
  ): Promise<{ data: number, revertCallback: () => void }> {
    const rotatableToken = Rotatable.validate(token);
    if (!rotatableToken) {
      throw new Error("Given token is not rotatable");
    }

    const promise = new Promise<{ data: number, revertCallback: () => void }>(async (resolve, reject) => {
      this._sceneService.components.rotateMenuComponent.showControls(rotatableToken);
      
      const provider = this._sceneService.inputs$
        .pipe(
          filter(e => e.type === 'click'),
          switchMap(e => from(this._sceneService.components.rotateMenuComponent.rotateTile(e.x, e.y))),
          filter(r => !!r),
          map(r => {
            const boardObject = Object.assign({}, this._dungeonSceneStore.currentState.tokens[rotatableToken.auxId]);
            boardObject.rotation = this.calculateRotation(r, boardObject.rotation) as IBoardObjectRotation;
            this._dungeonSceneStore.setObjectState(boardObject);
            return boardObject.rotation;
          }),
      )
      
      const revertCallback = () => {
        const boardObject = Object.assign({}, this._dungeonSceneStore.currentState.tokens[rotatableToken.auxId]);
        const o = Object.assign({}, boardObject);
        o.rotation = initialRotation;
        this._dungeonSceneStore.setObjectState(o);
      }
      const decision = await resolver(provider);
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
      this._sceneService.components.rotateMenuComponent.hideControls();
    });

    return promise;
  }

  public requireSelectField(
    allowedFieldIds: string[],
    resolver: (provider: Observable<unknown>) => Promise<IActivityConfirmationResult>
  ): Promise<{ data: FieldBase | null, revertCallback: () => void }> {
    return new Promise<{ data: FieldBase | null, revertCallback: () => void }>(async (resolve, reject) => {
      const fields = allowedFieldIds.map(id => this._sceneService.components.boardComponent.getField(id));
      if (fields.some(f => !f)) {
        reject();
      }
      this._sceneService.components.boardComponent.initializeFieldHovering(allowedFieldIds);
      const provider = this._sceneService.inputs$
        .pipe(
          filter(e => e.type === 'click'),
          map(e => this._sceneService.components.boardComponent.getTargetedField(e.x, e.y)),
          filter(f => allowedFieldIds.some(id => id === f?.auxId)),
          tap(f => f && this._dungeonSceneStore.selectField(f.auxId))
        )

      const confirmationResult = await resolver(provider);
      if (confirmationResult.confirmed) {
        resolve({
          data: confirmationResult.data as FieldBase,
          revertCallback: () => this._dungeonSceneStore.resetSelections()
        });
      } else {
        resolve({
          data: null,
          revertCallback: () => this._dungeonSceneStore.resetSelections() 
        });
        this._dungeonSceneStore.resetSelections();
      }
      this._sceneService.components.boardComponent.disableHovering();
    });
  }

  public highlightFields(allowedFieldRangeIds: string[]): void {
    this._dungeonSceneStore.highlightRange(allowedFieldRangeIds);
  }

  public requireSelectActor(
    allowedActorIds: string[],
    resolver: (provider: Observable<unknown>) => Promise<IActivityConfirmationResult>
  ): Promise<{ data: FieldBase | null, revertCallback: () => void }> {
    return new Promise<{ data: FieldBase | null, revertCallback: () => void }>(async (resolve, reject) => {
      const actors = allowedActorIds.map(id => this._sceneService.components.boardComponent.getToken(id));
      if (actors.some(f => !f)) {
        reject();
      }

      this._sceneService.components.boardComponent.initializeTokenHovering(allowedActorIds);
      const provider = this._sceneService.inputs$
        .pipe(
          filter(e => e.type === 'click'),
          map(e => this._sceneService.components.boardComponent.getTargetedToken(e.x, e.y)),
          filter(t => allowedActorIds.some(id => id === t?.auxId)),
          tap(t => t && this._dungeonSceneStore.selectActor(t.auxId)),
        )

      const confirmationResult = await resolver(provider);
      if (confirmationResult.confirmed) {
        resolve({
          data: confirmationResult.data as FieldBase,
          revertCallback: () => this._dungeonSceneStore.resetSelections()
        });
      } else {
        resolve({
          data: null,
          revertCallback: () => this._dungeonSceneStore.resetSelections() 
        });
      }
      this._sceneService.components.boardComponent.disableHovering();
    });
  }

  public listenForInteractionsWithActors(allowedActorIds: string[]): Observable<TokenBase> {
    this._sceneService.components.boardComponent.initializeTokenHovering(allowedActorIds);
    return this._sceneService.inputs$
      .pipe(
        filter(e => e.type === 'click'),
        map(e => this._sceneService.components.boardComponent.getTargetedToken(e.x, e.y)),
        filter(t => allowedActorIds.some(id => id === t?.auxId)),
        tap(t => {
          this._sceneService.components.boardComponent.disableHovering();
        })
      )
  }

  public calculateRotation(rotation: number, initialRotation: number): number {
    if (rotation === 0) {
      return initialRotation;
    }
    
    const possibleDirections = 6;
    const x = (initialRotation + rotation) % possibleDirections;
    if (x < 0) {
      return possibleDirections + x
    } else {
      return x;
    }
  }
}