import { FlexibleConnectedPositionStrategyOrigin, Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";
import { ComponentRef, Injectable, Injector } from "@angular/core";
import { InfoPanelComponent } from "../components/info-panel/info-panel.component";
import { Observable, Subject, finalize, first, map, race, take, tap } from "rxjs";
import { IConfirmationPanel } from "../interfaces/confirmation-panel.interface";
import { IComponentOutletPanelRef } from "../interfaces/component-outlet-panel-ref.interface";
import { IFormPanel } from "../interfaces/form-panel-interface";
import { IAuxiliaryView } from "../interfaces/auxiliary-view.interface";
import { RoutingService } from "src/app/aspects/navigation/api";

@Injectable({ providedIn: "root" })
export class ModalService {
  constructor(
    private readonly _overlayService: Overlay,
    private readonly _positionBuilder: OverlayPositionBuilder,
    private readonly _routingService: RoutingService
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

    this._routingService.onNavigationStart$.pipe(take(1)).subscribe(() => overlayRef.dispose());

    overlayRef.backdropClick().pipe(take(1)).subscribe(() => overlayRef.dispose())
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

    this._routingService.onNavigationStart$.pipe(take(1)).subscribe(() => overlayRef.dispose());

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

    this._routingService.onNavigationStart$.pipe(take(1)).subscribe(() => overlayRef.dispose());
    const componentRef = overlayRef.attach(new ComponentPortal(component));
    return new Observable(s => {
      race(
        overlayRef.backdropClick().pipe(map(() => false)),
        componentRef.instance.onSettlement$.pipe(take(1))
      ).subscribe(v => {
        overlayRef.dispose();
        s.next(v);
        s.complete();
      })
    });
  }


  public createFormPanel(
    component: ComponentType<IFormPanel>,
    inputs?: { [key: string]: unknown }
  ): Observable<number> {
    const position = this._positionBuilder.global().centerHorizontally().centerVertically()
    const overlayRef = this._overlayService.create({
      positionStrategy: position,
      panelClass: "panel-class",
      disposeOnNavigation: true,
      hasBackdrop: true
    });

    this._routingService.onNavigationStart$.pipe(take(1)).subscribe(() => overlayRef.dispose());
    const componentRef = overlayRef.attach(new ComponentPortal(component));

    if (!!inputs) {
      Object.entries(inputs).forEach(i => componentRef.setInput(i[0], i[1]))
    }

    return race(
      overlayRef.backdropClick().pipe(map(() => 0)),
      componentRef.instance.onSettlement$
    ).pipe(finalize(() => overlayRef.dispose()))
  }


  public createComponentOutletPanel(
    av: IAuxiliaryView,
    injector?: Injector
  ): IComponentOutletPanelRef {
    const position = this._positionBuilder.global().centerHorizontally().centerVertically()

    let overlayRef = this._overlayService.create({
      positionStrategy: position,
      panelClass: "component-outlet",
      disposeOnNavigation: true,
      hasBackdrop: true
    });

    this._routingService.onNavigationStart$.pipe(take(1)).subscribe(() => overlayRef.dispose());
    let ref: ComponentRef<unknown>;
    const o =  {
      setOverlay: (component: ComponentType<unknown>) => {
        overlayRef.detach();
        ref = overlayRef.attach(new ComponentPortal(component, null, injector))
      },
      setInputs: (inputs: { [key: string]: unknown }) => {
        Object.entries(inputs).forEach(i => ref.setInput(i[0], i[1]))
      },
      getComponentRef: () => ref,
      getOverlayRef: () => overlayRef,
      onDispose$: new Subject<void>()
    }
    return o;
  }

}