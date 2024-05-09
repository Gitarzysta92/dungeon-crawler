import { Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { ComponentType, ComponentPortal } from "@angular/cdk/portal";
import { ComponentRef, Injectable } from "@angular/core";
import { ILoadingScreen } from "../interfaces/loading-screen.interface";

@Injectable({ providedIn: 'root' })
export class LoadingScreenService {

  private readonly _overlays: Map<string, {
    overlayRef: OverlayRef,
    portal: ComponentPortal<ILoadingScreen>,
    componentRef: ComponentRef<ILoadingScreen>
  }> = new Map();

  constructor(
    private readonly _overlayService: Overlay,
    private readonly _positionBuilder: OverlayPositionBuilder
  ) { }
  
  public showLoadingScreen(key: string, component: ComponentType<ILoadingScreen>): () => void {
    const position = this._positionBuilder.global();
    const overlayRef = this._overlayService.create({
      positionStrategy: position,
      panelClass: "loader-class",
      disposeOnNavigation: false,
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
      console.log(o)
      //o.componentRef.setInput('skipAnimation', skipAnimation);
      o.overlayRef.detach();
    }
  }
}