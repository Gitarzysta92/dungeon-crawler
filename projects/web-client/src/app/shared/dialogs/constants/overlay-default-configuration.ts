import { GlobalPositionStrategy, OverlayConfig } from "@angular/cdk/overlay";

export const overlayDefaultConfig: OverlayConfig = {
  panelClass: "custom-modal",
  maxWidth: '400px',
  maxHeight: '600px',
  hasBackdrop: true,
  backdropClass: "custom-modal-backdrop",
  positionStrategy: new GlobalPositionStrategy().centerHorizontally().centerVertically(),
  disposeOnNavigation: true
}