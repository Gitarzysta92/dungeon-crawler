import { Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { ComponentType, ComponentPortal } from "@angular/cdk/portal";
import { ComponentRef, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LoadingScreenService {

  private readonly _overlays: Map<string, {
    overlayRef: OverlayRef,
    portal: ComponentPortal<any>,
    componentRef: ComponentRef<any>
  }> = new Map();

  constructor(
    private readonly _overlayService: Overlay,
    private readonly _positionBuilder: OverlayPositionBuilder
  ) { }
  
  public showLoadingScreen(key: string, component: ComponentType<any>): () => void {
    if (this._overlays.has(key)) {
      return;
    }

    const position = this._positionBuilder.global();
    const overlayRef = this._overlayService.create({
      positionStrategy: position,
      panelClass: "loader-class",
      disposeOnNavigation: true,
      hasBackdrop: false,
      width: '100vw',
      height:  '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
    const portal = new ComponentPortal(component);
    
    this._overlays.set(key, {
      overlayRef,
      portal,
      componentRef: overlayRef.attach(portal)
    });

    return () => {
      this._overlays.delete(key);
      overlayRef.detach();
    } 
  }

  public hideLoadingScreen(key: string, skipAnimation: boolean = false) {
    const o = this._overlays.get(key);
    if (o) {
      //o.componentRef.setInput('skipAnimation', skipAnimation);
      o.overlayRef.detach();
      this._overlays.delete(key);
    }
  }
}