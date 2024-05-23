import { FlexibleConnectedPositionStrategyOrigin, Overlay, OverlayPositionBuilder } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { InfoPanelComponent } from "../components/info-panel/info-panel.component";
import { Observable, first, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class ModalService {
  constructor(
    private readonly _overlayService: Overlay,
    private readonly _positionBuilder: OverlayPositionBuilder
  ) { };

  public createInfoPanel(
    origin: FlexibleConnectedPositionStrategyOrigin,
    data: any
  ) {
    const position = this._positionBuilder.flexibleConnectedTo(origin)
    .withPositions([
      // Define at least one position for the overlay
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
      { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    ]);
    const overlayRef = this._overlayService.create({
      positionStrategy: position,
      panelClass: "panel-class",
      disposeOnNavigation: true,
      hasBackdrop:true
    });

    overlayRef.backdropClick().pipe(first()).subscribe(() => overlayRef.dispose())

    const componentRef = overlayRef.attach(new ComponentPortal(InfoPanelComponent));

    componentRef.setInput("infoData", data);
  }

  public createConfirmationPanel(data: any): Observable<boolean> {
   return of(true) 
  }
}