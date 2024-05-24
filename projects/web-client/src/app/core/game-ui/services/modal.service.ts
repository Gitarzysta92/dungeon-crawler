import { FlexibleConnectedPositionStrategyOrigin, Overlay, OverlayPositionBuilder } from "@angular/cdk/overlay";
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { InfoPanelComponent } from "../components/info-panel/info-panel.component";
import { Observable, catchError, finalize, first, map, of, race, tap } from "rxjs";
import { IConfirmationPanel } from "../interfaces/confirmation-panel.interface";

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

  public createConfirmationPanel(component: ComponentType<IConfirmationPanel>): Observable<boolean> {
    const position = this._positionBuilder.global().centerHorizontally().bottom('10%');

    const overlayRef = this._overlayService.create({
      positionStrategy: position,
      panelClass: "panel-class",
      disposeOnNavigation: true,
      hasBackdrop: true
    });

    const componentRef = overlayRef.attach(new ComponentPortal(component));

    return race(
      overlayRef.backdropClick().pipe(map(() => false)),
      componentRef.instance.onSettlement$
    ).pipe(
      finalize(() => overlayRef.dispose()),
    )

  }
}