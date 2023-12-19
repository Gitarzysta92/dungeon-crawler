import { Injectable, OnDestroy } from "@angular/core";
import { Store } from "@utils/store/store";
import { Subject } from "rxjs";
import { StoreService } from "src/app/infrastructure/data-store/api";
import { IDevBoardFieldState, IDevBoardObjectState, IDevBoardState } from "../interfaces/dev-board-state-interface";
import { DevBoardAction, StoreName } from "./dev-board.store-keys";
import { CoordsHelper } from "@game-logic/lib/features/board/coords.helper";
import { IBoardCoordinates } from "@game-logic/lib/features/board/board.interface";
import { Board } from "@game-logic/lib/features/board/board";

@Injectable()
export class DevBoardStore<F extends IDevBoardFieldState, T extends IDevBoardObjectState> implements OnDestroy {
 
  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; };

  private _store: Store<IDevBoardState<F, T>>;
  private _onDestroy: Subject<void> = new Subject();

  constructor(
    private readonly _storeService: StoreService,
  ) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public addObject(o: T): void {
    this._store.dispatch(DevBoardAction.addObject, o);
  }

  public selectObject(auxId: string): void {
    this._store.dispatch(DevBoardAction.selectObject, auxId)
  }

  public updateObjectPosition(id: string, auxCoords: any): void {
    this._store.dispatch(DevBoardAction.updateObjectPosition, { id, auxCoords })
  }

  public updateObject(o: Partial<T>): void {
    this._store.dispatch(DevBoardAction.updateObject, o)
  }

  public resetSelection(): void {
    this._store.dispatch(DevBoardAction.resetSelection);
  }

  public initializeStore(fields: F[], objects: T[] = []): void {
    this._store = this._storeService.createStore<IDevBoardState<F, T>>(StoreName.devBoardStore, {
      initialState: this._createInitialState(fields, objects),
      actions: { 
        [DevBoardAction.addObject]: { action: (ctx) => this._addObject(ctx.payload, ctx.initialState) },
        [DevBoardAction.selectObject]: { action: (ctx) => this._selectObject(ctx.payload, ctx.initialState) },
        [DevBoardAction.updateObjectPosition]: { action: (ctx) => this._updateObjectPosition(ctx.payload.id, ctx.payload.auxCoords, ctx.initialState) },
        [DevBoardAction.resetSelection]: { action: (ctx) => this._resetSelection(ctx.initialState) },
        [DevBoardAction.updateObject]: { action: (ctx) => this._updateObject(ctx.payload, ctx.initialState) }
      }
    });
  }

  private _createInitialState(fields: F[], objects: T[] = []): IDevBoardState<F, T> {
    return new Board({
      fields: Object.fromEntries(fields.map(f => [CoordsHelper.createKeyFromCoordinates(f.position), f])),
      objects: Object.fromEntries(objects.map(o => [CoordsHelper.createKeyFromCoordinates(o.position), o]))
    });
  }

  private _addObject(payload: T, state: IDevBoardState<F, T>): IDevBoardState<F, T> {
    Object.assign(state.objects, {
      [payload.id]: payload
    });

    return state;
  }

  private _selectObject(id: string, state: IDevBoardState<F, T>): IDevBoardState<F, T> {
    for (let object of Object.values(state.objects)) {
      if (object.id === id) {
        object.isSelected = true;
      } else {
        object.isSelected = false;
      }
    }
    return state;
  }

  private _updateObjectPosition(id: string, position: IBoardCoordinates, state: IDevBoardState<F, T>): IDevBoardState<F, T> {
    state.objects[id].position = position;
    return state;
  }

  private _resetSelection(state: IDevBoardState<F, T>): IDevBoardState<F, T> {
    for (let object of Object.values(state.objects)) {
      object.isSelected = false;
    }
    return state;
  }

  private _updateObject(so: T, state: IDevBoardState<F, T>): IDevBoardState<F, T> {
    Object.assign(state.objects[so.id], so)
    return state;
  }
 }