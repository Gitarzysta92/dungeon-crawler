import { Injectable, Injector } from "@angular/core";
import { ModalService } from "./modal.service";
import { GameUiStore } from "../stores/game-ui.store";
import { IComponentOutletPanelRef } from "../interfaces/component-outlet-panel-ref.interface";
import { first, map, race, Subject, take, takeUntil } from "rxjs";
import { IAuxiliaryView, IAuxiliaryViewComponent } from "../interfaces/auxiliary-view.interface";

@Injectable()
export class AuxiliaryViewService {

  private _auxiliaryViews: Map<number, IComponentOutletPanelRef> = new Map();

  constructor(
    private readonly _modalService: ModalService,
    private readonly _gameUiStore: GameUiStore,
  ) { }
  

  public openAuxiliaryView(
    av: IAuxiliaryView,
    inputs?: { [key: string]: unknown },
    injector?: Injector
  ): void {
    this._gameUiStore.selectAuxiliaryView(av);
    let view = this._auxiliaryViews.get(av.layerId);

    if (view && !view.getOverlayRef().hostElement) {
      this._auxiliaryViews.delete(av.layerId);
      view = null;
    }

    if (!view) {
      view = this._modalService.createComponentOutletPanel(av, injector);
      this._auxiliaryViews.set(av.layerId, view);
    }

    view.setOverlay(av.component);
    if (inputs) {
      view.setInputs(inputs);
    }

    if (!(view.getComponentRef().instance as IAuxiliaryViewComponent).onClose$) {
      (view.getComponentRef().instance as IAuxiliaryViewComponent).onClose$ = new Subject()
    }

    race(
      view.getOverlayRef().backdropClick().pipe(map(() => false)),
      (view.getComponentRef().instance as IAuxiliaryViewComponent).onClose$?.pipe(take(1))
    )
      .pipe(
        first(),
        takeUntil(view.onDispose$)
      )
      .subscribe(() => {
        this.closeAuxiliaryView(av)
      })
  }

  public closeAuxiliaryView(av: IAuxiliaryView) {
    const ref = this._auxiliaryViews.get(av.layerId);
    if (!ref) {
      return;
    }
    ref.onDispose$.next();
    this._gameUiStore.deselectAuxiliaryView(av)
    ref.getOverlayRef().dispose();
    this._auxiliaryViews.delete(av.layerId);
  }


  public dispose() {
    this._gameUiStore.currentState.auxiliaryViews.forEach(av => {
      this.closeAuxiliaryView(av)
    })
  }


}