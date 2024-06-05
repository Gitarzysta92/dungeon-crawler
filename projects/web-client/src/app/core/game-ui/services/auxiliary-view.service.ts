import { Injectable } from "@angular/core";
import { ModalService } from "./modal.service";
import { GameUiStore } from "../stores/game-ui.store";
import { IAuxiliaryView } from "../interfaces/auxiliary-view.interface";
import { IComponentOutletPanelRef } from "../interfaces/component-outlet-panel-ref.interface";

@Injectable()
export class AuxiliaryViewService {

  private _auxiliaryViews: Map<number, IComponentOutletPanelRef> = new Map();

  constructor(
    private readonly _modalService: ModalService,
    private readonly _gameUiStore: GameUiStore
  ) { }
  

  public openAuxiliaryView(av: IAuxiliaryView, inputs?: { [key: string]: unknown }): void {
    this._gameUiStore.selectAuxiliaryView(av);
    let ref = this._auxiliaryViews.get(av.layerId);

    if (ref && !ref.getOverlayRef().hostElement) {
      this._auxiliaryViews.delete(av.layerId);
      ref = null;
    }

    if (!ref) {
      ref = this._modalService.createComponentOutletPanel(av);
      this._auxiliaryViews.set(av.layerId, ref);
    }

    ref.setOverlay(av.component);
    if (inputs) {
      ref.setInputs(inputs);
    }
  }

  public closeAuxiliaryView(layerId: number) {
    const ref = this._auxiliaryViews.get(layerId);
    if (!ref) {
      return;
    }
    ref.getOverlayRef().dispose();
    this._auxiliaryViews.delete(layerId);
  }


}