import { OverlayConfig, FlexibleConnectedPositionStrategy, ViewportRuler, OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { DialogRef, ModalService2 } from 'src/app/shared/dialogs/api';

@Injectable()
export class BoardObjectModalService {

  constructor(
    private readonly _modalService: ModalService2,
    private readonly _viewportRuler: ViewportRuler,
    private readonly _platform: Platform,
    private readonly _overlayContainer: OverlayContainer
  ) { }

  public open<T extends object>(component: any, x: number, y: number, data?: T): DialogRef {
    const fcp = new FlexibleConnectedPositionStrategy(
      { x, y },
      this._viewportRuler,
      document,
      this._platform,
      this._overlayContainer
    )

    const cfg: OverlayConfig = {
      panelClass: "custom-modal",
      maxWidth: '400px',
      maxHeight: '600px',
      hasBackdrop: true,
      backdropClass: "custom-modal-backdrop",
      positionStrategy: fcp.withPositions([{ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' }]),
      disposeOnNavigation: true
    }

    return this._modalService.open(component, data, cfg);
  }

}
