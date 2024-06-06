import { FlexibleConnectedPositionStrategyOrigin, Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";
import { ComponentRef, Injectable } from "@angular/core";
import { InfoPanelComponent } from "../components/info-panel/info-panel.component";
import { Observable, finalize, first, map, race } from "rxjs";
import { IConfirmationPanel } from "../interfaces/confirmation-panel.interface";
import { IComponentOutletPanelRef } from "../interfaces/component-outlet-panel-ref.interface";
import { IAuxiliaryView } from "../interfaces/auxiliary-view.interface";

@Injectable({ providedIn: "root" })
export class ModalService {
  constructor(
    private readonly _overlayService: Overlay,
    private readonly _positionBuilder: OverlayPositionBuilder
  ) { };

  public createInfoPanel(
    origin: FlexibleConnectedPositionStrategyOrigin,
    data: any
  ): OverlayRef {
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
    return overlayRef;
  }

  public createHoverInfoPanel(
    origin: FlexibleConnectedPositionStrategyOrigin,
    data: any
  ): OverlayRef {
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
      
      hasBackdrop: false
    });

    const componentRef = overlayRef.attach(new ComponentPortal(InfoPanelComponent));
    componentRef.setInput("infoData", data);
    return overlayRef;
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
    ).pipe(finalize(() => overlayRef.dispose()))
  }

  public createComponentOutletPanel(
    av: IAuxiliaryView,
  ): IComponentOutletPanelRef {
    const position = this._positionBuilder.global().centerHorizontally().top('20%');

    let overlayRef = this._overlayService.create({
      positionStrategy: position,
      panelClass: "component-outlet",
      disposeOnNavigation: true,
      hasBackdrop: true
    });

    let ref: ComponentRef<unknown>;

    overlayRef.backdropClick().pipe(first()).subscribe(() => overlayRef.dispose())
    const o =  {
      setOverlay: (component: ComponentType<unknown>) => {
        overlayRef.detach();
        ref = overlayRef.attach(new ComponentPortal(component))
      },
      setInputs: (inputs: { [key: string]: unknown }) => {
        Object.entries(inputs).forEach(i => ref.setInput(i[0], i[1]))
      },
      getComponentRef: () => ref,
      getOverlayRef: () => overlayRef
    }
    return o;
  }

}